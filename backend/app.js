import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import express from 'express';
import cors from 'cors';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

//test with what is a programming language
const loader = YoutubeLoader.createFromUrl("https://youtu.be/XASY30EfGAc?feature=shared", {
  language: "en",
  addVideoInfo: true,
});

const docs = await loader.load();

const app = express()
const port = 3001
app.use(cors());

app.get('/', (req, res) => {
  res.send(docs)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})