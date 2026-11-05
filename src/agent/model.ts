import { createGroq } from "@ai-sdk/groq";
 
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set - add it to your .env file`);
  return value;
}
 
// Built when a request needs it, not when the file is imported,
// so importing your app in a test never needs a key.
export function getModel() {
  const groq = createGroq({ //Makes the connection to Groq. We pass the key in ourselves so a missing key gives your clear message instead of a vague one.
    apiKey: requireEnv("GROQ_API_KEY"),
    baseURL: process.env.GROQ_BASE_URL,
  });
  return groq(process.env.GROQ_MODEL ?? "openai/gpt-oss-20b"); //Picks the model. The name comes from your .env. If you forget it, the file falls back to openai/gpt-oss-20b.
}
