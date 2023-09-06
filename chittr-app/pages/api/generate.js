import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { PineconeClient } from '@pinecone-database/pinecone';

const pinecone = new PineconeClient();

await pinecone.init({
  apiKey: PINECONE_API_KEY, 
  environment: "gcp-starter",
});

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.5,
  openAIApiKey: OPENAI_API_KEY,
});


const generateAction = async (req, res) => {
  try {
    const { textQuestion } = req.body.userInput;

    const response = await model.predictMessages([
      new HumanMessage(textQuestion),
    ]);

    const gptOutput = response.content || "No response from the model.";

    console.log("GPT Response:", response.content); // Add this line for logging

    res.status(200).json({ gptOutput });
  } catch (error) {
    console.error("Error:", error); // Add this line for logging
    res.status(500).json({ error: "An error occurred" });
  }
};

export default generateAction;