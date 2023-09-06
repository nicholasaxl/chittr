import React from 'react';
import ChatBox from '../components/ChatBox';
import { TextLoader } from "langchain/document_loaders/fs/text";

const loader = new JSONLoader("src/document_loaders/example_data/example.json");
const docs = await loader.load();
console.logs(docs)

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Chittr.AI</h1>
      <ChatBox />
    </div>
  );
}

export default Home;