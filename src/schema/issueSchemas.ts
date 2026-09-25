import { z } from "zod";
 
export const createIssueSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  stepsToReproduce: z.string().min(1, "steps to reproduce is required"),
  priority: z.enum(["low", "medium", "high"]),
  

})

export const updateIssueSchema = createIssueSchema.partial();



export type UpdateIssueInput = z.infer<typeof updateIssueSchema>
export type CreateIssueInput = z.infer<typeof createIssueSchema>
