import { z } from "zod";
 
// What the person sends us. The length limits also protect
// your free token allowance.
export const triageInputSchema = z.object({
  title: z.string().min(1, "Title is required").max(200), //Long text costs tokens. These limits protect your free allowance and are checked before any tokens are spent
  description: z.string().min(1, "Description is required").max(1500),
});
 
// What the assistant must send back.
// If the model's answer does not fit this shape, it is thrown away.
export const triageSuggestionSchema = z.object({
  classification: z.enum(["approved", "unapproved", "duplicate"]), //The assistant may only choose these words. Anything else is rejected.
  priority: z.enum(["low", "medium", "high"]),
  reason: z.string().min(1).max(300),
  duplicateOf: z
    .string()
    .regex(/^[0-9a-f]{24}$/, "duplicateOf must be an issue id") //A real issue id is 24 letters and digits. The pattern rejects anything else, including a sentence a model was tricked into writing.
    .optional(),
});

//The AI SDK shows this shape to the model and checks the answer against it. You do not name it or register it anywhere. Your tests use the same shape.
 
export type TriageInput = z.infer<typeof triageInputSchema>;
export type TriageSuggestion = z.infer<typeof triageSuggestionSchema>;
