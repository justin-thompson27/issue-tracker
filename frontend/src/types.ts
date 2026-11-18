import { z } from 'zod'
 
export const statusSchema = z.enum(['open', 'in-progress', 'closed'])
export const prioritySchema = z.enum(['low', 'medium', 'high'])
 
const userRefSchema = z.object({
  userId: z.string(),
  fullName: z.string(),
})
 
// What GET /issues sends back for one issue. Zod checks it when it arrives.
export const issueSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  stepsToReproduce: z.string(),
  priority: prioritySchema,
  status: statusSchema,
  author: userRefSchema,
  assignedTo: userRefSchema.optional(),
  createdOn: z.string(),
})
 
export type Status = z.infer<typeof statusSchema>
export type Priority = z.infer<typeof prioritySchema>
export type Issue = z.infer<typeof issueSchema>
export type StatusFilter = Status | 'all'
