import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});


const generateAction = async (req, res) => {
  const {textQuestion } = req.body.userInput;

  const baseSystemPrefix = `
  Instructions: You are a bot with the only function being to answer university lecture related questions.
  `;

  const baseUserPrefix = `
  Include a main section and 3-5 subsections.

  ====

  Strictly follow this format:
  Heading:[heading title]
  Content: [content]
  `;

  const baseUserInput = `
  Question: ${textQuestion}

  =====

  Answer with specific details:
  `;

  const baseCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.55,
    messages: [
      { role: "system", content: baseSystemPrefix },
      { role: "user", content: baseUserPrefix },
      { role: "user", content: baseUserInput },
    ],
    stream: false,
  });

  const basePromptOutput = baseCompletion.choices[0].message.content;

  res.status(200).json({ gptOutput: basePromptOutput });
};

export default generateAction;