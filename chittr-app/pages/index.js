import React from 'react';
import Head from 'next/head';
import ChatBox from '../components/chatBox';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Chittr.AI</h1>
      <h2 className="mb-4">Ask a lecture question</h2>
      <ChatBox />
    </div>
  );
}

export default Home;