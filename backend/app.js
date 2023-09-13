import express from 'express';
import cors from 'cors';

import { PineconeClient } from "@pinecone-database/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { createIndex } from "./createIndex.js";
import { updatePinecone } from "./updatePinecone.js";
import { queryPinecone } from "./queryPinecone.js";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { sleep } from 'openai/core.js';
import bodyParser from 'body-parser';


const loader = new TextLoader("document_loaders/example_data/cs188.txt");
const docs = await loader.load();

var question = "";
var resultText = "";

const indexName = "chittr-cs188-test";
const vectorDimension = 1536;
const client = new PineconeClient();
await client.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: "gcp-starter",
});

(async () => {
    // await createIndex(client, indexName, vectorDimension);
    // await updatePinecone(client, indexName, docs);
})();

//express 
const app = express()
const port = 3001
app.use(cors(), bodyParser.json());

app.post('/', async (req, res) => {
  question = req.body.question;
  resultText = await queryPinecone(client, indexName, question);
  res.send(resultText)
})

app.listen(port, () => {
  console.log("listening on port 3001")
})