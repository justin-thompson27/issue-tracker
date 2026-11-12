import { generateText, tool, isStepCount } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { z } from "zod";
 
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: process.env.GROQ_BASE_URL, //createGroq({ apiKey, baseURL })
});
 
// The model has no clock. Only this tool knows the time.
const getTime = tool({
  description: "Get the current time.",
  inputSchema: z.object({}),
  execute: async () => new Date().toLocaleTimeString("en-US"), //new Date().toLocaleTimeString("en-US")
});
 
const result = await generateText({ //Runs the loop: ask the model, run any tool it asked for, ask again.
  model: groq(process.env.GROQ_MODEL ?? "openai/gpt-oss-20b"), //groq("openai/gpt-oss-20b")
  tools: { get_time: getTime }, //Wraps a function so the model can ask for it. The model reads the description to decide when to use it, so write it like instructions to a new coworker. inputSchema is a Zod shape for what the model may send, and execute is your code.
  stopWhen: isStepCount(5), //Says when to stop looping: after 5 trips to the model. Without it, generateText stops after the first trip, even if the model was waiting for a tool.
  maxRetries: 0,
  prompt: "What time is it?",
});
 
// One step per trip to the model. The loop is visible:
console.log(result.steps.map((step) => step.finishReason)); //One entry per trip to the model, in order. Each has a finishReason.
console.log(result.text); //The final answer in words.
