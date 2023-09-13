// import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
// dotenv.config();
//
import { PineconeClient } from "@pinecone-database/pinecone";
import { queryPinecone } from "../queryPinecone.js";
import bodyParser from 'body-parser';


// const loader = YoutubeLoader.createFromUrl("https://youtu.be/V-NH5orGUi8?si=gM38t5jAFVjzgF0h", {
//   language: "en",
//   addVideoInfo: true,
// });
// const docs = await loader.load();

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

//send
// app.get('/', (req, res) => {
//   res.send(docs)
// })

//query
app.post('/', async (req, res) => {
  question = req.body.question;
  resultText = await queryPinecone(client, indexName, question);
  res.send(resultText)
})

app.listen(port, () => {
  console.log("listening on port 3001")
})

module.exports = app;