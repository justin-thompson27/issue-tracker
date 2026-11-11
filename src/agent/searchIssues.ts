import { tool } from "ai";
import { z } from "zod";
import { getIssuesCollection } from "../db.js";
 
// The model chooses the words, so they are untrusted.
// Escape them before they go into a regex.
function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
 
export const searchIssues = tool({
  description:
    "Look for existing issues whose title contains these words. " + //What the model reads to decide when to use the tool. The tool’s name, search_issues, is given in Step 4, where you hand the tool to the model.
    "Returns at most 5 as id, title, status.",
  inputSchema: z.object({
    words: z
      .string()
      .min(1)
      .max(60) //The model chooses the words, so the tool limits what it may send.
      .describe("One or two key words from the new issue"),
  }),
  execute: async ({ words }) => { //Your code. The model asks, this function runs, and whatever it returns goes back to the model.
    const found = await getIssuesCollection()
      .find(
        { title: { $regex: escapeRegExp(words), $options: "i" } }, //The model’s words go into a regular expression. A word like .* would match every issue. Escaping turns symbols into plain letters, so the model can’t trick you into returning everything. $options: "i" makes the search case-insensitive.
        { projection: { title: 1, status: 1 } },
      )
      .limit(5) //The assistant never sees more than five issues. Less to read means fewer tokens.
      .toArray();
    return found.map((issue) => ({ //Only the id, title and status are handed over. The model never sees descriptions or people’s names.
      id: String(issue._id),
      title: issue.title,
      status: issue.status,
    }));
  },
});
