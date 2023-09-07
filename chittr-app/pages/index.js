import React from 'react';
import ChatBox from '../components/chatBox.js';
import axios from 'axios';

const docs = axios.get('http://127.0.0.1:3001/').then(function (response) {
  // handle success
  console.log(response.data);
  return response;
});

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Chittr.AI</h1>
      <ChatBox />
    </div>
  );
}

export default Home;