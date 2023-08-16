import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  const { textUniversity, textQuestion } = req.body.userInput;

  const baseSystemPrefix = `
  Instructions: You are an encouraging student at the university soon to be mentioned by the user, a high school student. A high school student is applying as a freshman and is an international student. Answer with very specific details.
  `;

  const baseUserPrefix = `
  Include a main section and 3-5 subsections.

  ====

  Strictly follow this format:
  Heading:[heading title]
  Content: [content]

  Subsection 1: [subsection title]
  Content: [content]

  Subsection 2: [subsection title]
  Content: [content]
  `;

  const baseUserInput = `
  Question from international student: ${textQuestion}

  =====

  Answer with 2-3 emojis and specific details:
  `;

  const baseCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.55,
    messages: [
      { role: "system", content: baseSystemPrefix },
      { role: "user", content: baseUserPrefix },
      { role: "user", content: baseUserInput },
    ],
    stream: false,
  });

  const basePromptOutput = baseCompletion.data.choices[0].message.content;

  // const stream = new ReadableStream({
  //   async start(controller) {
  //     // callback
  //     function onParse(event) {
  //       if (event.type === "event") {
  //         const data = event.data;

  //         if (data === "[DONE]") {
  //           controller.close();
  //           return;
  //         }
  //         try {
  //           const json = JSON.parse(data);
  //           const text = json.choices[0].delta.content || "";
  //           const queue = encoder.encode(text);
  //           controller.enqueue(queue);
  //         } catch (e) {
  //           // maybe parse error
  //           controller.error(e);
  //         }
  //       }
  //     }

  //     // stream response (SSE) from OpenAI may be fragmented into multiple chunks
  //     // this ensures we properly read chunks and invoke an event for each SSE event stream
  //     const parser = createParser(onParse);
  //     // https://web.dev/streams/#asynchronous-iteration
  //     for await (const chunk of res.body) {
  //       parser.feed(decoder.decode(chunk));
  //     }
  //   },
  // });

  // return stream;

  res.status(200).json({ gptOutput: basePromptOutput });
};

export default generateAction;