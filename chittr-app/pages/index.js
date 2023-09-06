import React from 'react';
import ChatBox from '../components/chatBox.js';
import { JSONLoader } from "langchain/document_loaders/fs/json";

const loader = new JSONLoader(
  "../document_loaders/example_data/example.json",
  ["/from", "/surname"]
);
//const docs = await loader.load();


function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Chittr.AI</h1>
      <ChatBox />
    </div>
  );
}

export default Home;