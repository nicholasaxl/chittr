import React from 'react';
import chatBox from '../components/chatBox.js';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Chittr.AI</h1>
      <chatBox />
    </div>
  );
}

export default Home;