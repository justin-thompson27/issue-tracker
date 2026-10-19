import { z } from "zod";
 
export const createIssueSchema = z.object({ //these 4 fields are required when making an issue
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  stepsToReproduce: z.string().min(1, "steps to reproduce is required"),
  priority: z.enum(["low", "medium", "high"]),
  

})

export const updateIssueSchema = createIssueSchema.partial(); //makes all fields optional 

export const setStatusSchema = z.object({
  status: z.enum(["open", "in-progress", "closed"]),
})
export const classifyIssueSchema = z.object({
  classification: z.enum(["unclassified", "approved", "unapproved", "duplicate"]),
})

export const assignIssueSchema = z.object({
  
    userId: z.string().min(1, "userId is required"),
    fullName: z.string().min(1, "fullName is required"),
 
})

export const addCommentSchema = z.object({
  comment: z.string().min(1, "comment is required")
})

export const setTestCaseResultSchema = z.object(
  {
    passed: z.boolean()
  }
)



export const listIssuesQuerySchema = z.object({
  classification: z.enum(["unclassified", "approved", "unapproved", "duplicate"]).optional(),
  status: z.enum(["open", "in-progress", "closed"]).optional(),
   priority: z.enum(["low", "medium", "high"]).optional(),
   assignedTo: z.string().optional(),
   q: z.string().optional(),
   sort: z.enum(["createdOn", "-createdOn", "priority", "-priority" ]).optional(),
   page: z.coerce.number().int().min(1).default(1),
   limit: z.coerce.number().int().min(1).max(50).default(20),
    
})


export const postTimelogSchema = z.object({
  // The time spent on the issue in hours.
 hoursWorked: z.coerce.number().positive("Time spent must be greater than 0"),
});

// Validates the issue ID from the URL.
// MongoDB ObjectIds must contain exactly 24 hexadecimal characters.
export const issueIdParamsSchema = z.object({
  id: z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    "Issue ID must be exactly 24 hexadecimal characters"
  ),
});



export type UpdateIssueInput = z.infer<typeof updateIssueSchema>;// this type will be used in the controllers function for update
export type CreateIssueInput = z.infer<typeof createIssueSchema>;// this type will be used in the controllers function for create
export type SetStatusInput = z.infer<typeof setStatusSchema>;// this type will be used in the controllers function for set status
export type ClassifyIssueInput = z.infer<typeof classifyIssueSchema>;// this type will be used in the controllers function for classify issue
export type AssignIssueInput = z.infer<typeof assignIssueSchema>;// this type will be used in the controllers function for assign issue
export type AddCommentInput = z.infer<typeof addCommentSchema>;// this type will be used in the controllers function for add comment
export type SetTestCaseResultInput = z.infer<typeof setTestCaseResultSchema>; // this type will be used in the controllers function for set test case result
export type ListIssuesQuery = z.infer<typeof listIssuesQuerySchema>;
// The controller will use this after req.body has been validated.
export type PostTimelogInput = z.infer<typeof postTimelogSchema>;
// Creates a TypeScript type from the validated URL parameters.
export type IssueIdParams = z.infer<typeof issueIdParamsSchema>;