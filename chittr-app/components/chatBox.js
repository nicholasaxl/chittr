import React, { useState } from 'react';

function ChatBox() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  // Function to handle user input change
  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  async function fetchBotResponse(question) {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInput: {
          textQuestion: question,
        },
      }),
    });
  
    const data = await response.json();
    return data.gptOutput;
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
    setMessages([...messages, newUserMessage]);
  
    // Fetch bot's response
    const botResponse = await fetchBotResponse(userInput);
  
    // Create a new bot message
    const newBotMessage = {
      content: botResponse,
      role: "bot",
    };
  
    // Add the bot message to the messages array
    setMessages([...messages, newBotMessage]);
  
    // Clear the user input
    setUserInput('');
  };
  

  return (
    <div className="">
      <div className="flex-grow space-y-4">
        {messages.map((msg, index) => {
          return (
            <div className={`chat ${msg.role === "bot" ? "chat-start" : "chat-end"}`} key={"chatKey" + index}>
              <div className="chat-bubble shadow-md text-[hsl(209,5%,47%)] bg-[hsl(168,97%,95%)] w-auto max-w-xl break-words font-bold">
                {msg.content}
              </div>
            </div>
          );
        })}
      </div>
      <div className=" space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInputChange}
          className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
