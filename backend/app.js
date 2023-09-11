import { config } from "dotenv";
import express from 'express';
import cors from 'cors';
config();

import { PineconeClient } from "@pinecone-database/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

const loader = new PDFLoader("backend/document_loaders/example_data/cs188.pdf", {
  splitPages: true,
});
const docs = await loader.load();

const client = new PineconeClient();
await client.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});



//express 
const app = express()
const port = 3001
app.use(cors());

app.get('/', (req, res) => {
  res.send(docs)
})

app.listen(port, () => {
  console.log("listening on port 3001")
})