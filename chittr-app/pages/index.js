import React from 'react';
import ChatBox from '../components/chatBox.js';
import axios from 'axios';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Chittr.AI</h1>
      <ChatBox />
    </div>
  );
}

export default Home; 