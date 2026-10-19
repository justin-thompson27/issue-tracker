

import { Router,Request,Response, NextFunction } from "express";
import { error } from "node:console";
import { Issue} from "../data/issue.js";
import {createIssueSchema , updateIssueSchema, setStatusSchema, classifyIssueSchema , assignIssueSchema, addCommentSchema, setTestCaseResultSchema, listIssuesQuerySchema, postTimelogSchema, issueIdParamsSchema} from "../schema/issueSchemas.js";
import { listIssues , getIssueByID , createIssue, updateIssue, deleteIssue , setStatus , setClassify , assignIssue, addComment, deleteComment , addTestCase, setTestCaseResult, listIssuesQuery, postTimeLogEntry, getTimeLogSummary } from "../controllers/issueController.js";
import { validateBody, validateParams, validateQuery } from "../middleware/validate.js";
import { attachCurrentUser } from "../middleware/currentUser.js";
import { set } from "zod";




export const issuesRouter = Router(); //creates a router object that can be called from other files

/* issuesRouter.get("/", listIssues);  */
issuesRouter.get("/:id",getIssueByID);
issuesRouter.get("/", validateQuery(listIssuesQuerySchema), listIssuesQuery)
// GET /issues/:id/time-log/summary
// Validates the MongoDB issue ID before calculating the time-log summary.
issuesRouter.get("/:id/time-log/summary",validateParams(issueIdParamsSchema),  getTimeLogSummary);

issuesRouter.post("/",attachCurrentUser,validateBody(createIssueSchema),createIssue);  //creates a new issue with a status of open and priority of medium if not set
issuesRouter.post("/:id/comments",attachCurrentUser,validateBody(addCommentSchema),addComment);
issuesRouter.post("/:id/test-cases", attachCurrentUser, addTestCase);
//POST /issues/:id/time-log
//Creates a new time log entry using its MongoDB id.
issuesRouter.post("/:id/time-log",attachCurrentUser,validateBody(postTimelogSchema),postTimeLogEntry); 

issuesRouter.patch("/:id",validateBody(updateIssueSchema),updateIssue);
issuesRouter.patch("/:id/status",validateBody(setStatusSchema),setStatus);
issuesRouter.patch("/:id/classify",validateBody(classifyIssueSchema),setClassify);
issuesRouter.patch("/:id/assign",validateBody(assignIssueSchema),assignIssue);
issuesRouter.patch("/:id/test-cases/:testCaseId",validateBody(setTestCaseResultSchema),setTestCaseResult); 

issuesRouter.delete("/:id",deleteIssue)
issuesRouter.delete("/:id/comments/:commentId", deleteComment);

 
  export default issuesRouter;
