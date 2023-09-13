import React, { useState } from 'react';
import axios from 'axios';

function ChatBox() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
      setUserInput('');
    }
  };

  async function fetchBotResponse(q) {

    const res = await axios.post(
      "https://chittr-fkjt226j6-nicholasaxl.vercel.app", 
      {question: q},
      {headers: { "Content-Type": "application/json" }}
    );

    return res.data;
  } 
  

  const handleSendMessage = async () => {
    if (userInput.trim() === '') {
      window.alert("Please enter a valid question.");
      return;
    }
  
    // Create a new user message
    const newUserMessage = {
      content: userInput,
      role: "user",
    };
  
   // Add the user message to the messages array
   const updatedMessages = [...messages, newUserMessage];
   setMessages(updatedMessages);
 
   // Fetch bot's response
   const botResponse = await fetchBotResponse(userInput);
 
   // Create a new bot message
   const newBotMessage = {
     content: botResponse,
     role: "bot",
  };
  
    // Add the bot message to the messages array
    const finalMessages = [...updatedMessages, newBotMessage];
    setMessages(finalMessages);
  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                {msg.content}
              </div>
            ))}
          </div>
          <div>
            <input
              value={userInput}
              onChange={handleUserInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
            />
          </div>
        </div>
  );
}

export default ChatBox;
