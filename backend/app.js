import { JSONLoader } from "langchain/document_loaders/fs/json";
import express from 'express';

const loader = new JSONLoader(
  "document_loaders/example_data/example.json",
  ["/from", "/surname"]
);

const docs = await loader.load();

const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send(docs)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})