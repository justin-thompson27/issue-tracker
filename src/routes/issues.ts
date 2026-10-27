

import { Router,Request,Response, NextFunction , RequestHandler } from "express";
import { error } from "node:console";
import { Issue} from "../data/issue.js";
import {createIssueSchema , updateIssueSchema, setStatusSchema, classifyIssueSchema , assignIssueSchema, addCommentSchema, setTestCaseResultSchema, listIssuesQuerySchema, postTimelogSchema, issueIdParamsSchema} from "../schema/issueSchemas.js";
import { listIssues , getIssueByID , createIssue, updateIssue, deleteIssue , setStatus , setClassify , assignIssue, addComment, deleteComment , addTestCase, setTestCaseResult, listIssuesQuery, postTimeLogEntry, getTimeLogSummary } from "../controllers/issueController.js";
import { validateBody, validateParams, validateQuery } from "../middleware/validate.js";
import { set } from "zod";
import { requirePermission } from "../middleware/requirePermission.js";



function onlyWhenClosing(check: RequestHandler): RequestHandler {
  return (req, res, next) =>
    req.body.status === "closed" ? check(req, res, next) : next();
}


export const issuesRouter = Router(); //creates a router object that can be called from other files

/* issuesRouter.get("/", listIssues);  */
issuesRouter.get("/:id",getIssueByID);
issuesRouter.get("/", validateQuery(listIssuesQuerySchema), listIssuesQuery)
// GET /issues/:id/time-log/summary
// Validates the MongoDB issue ID before calculating the time-log summary.
issuesRouter.get("/:id/time-log/summary",validateParams(issueIdParamsSchema),  getTimeLogSummary);

issuesRouter.post("/",requirePermission("issue", "create"),validateBody(createIssueSchema),createIssue);  //creates a new issue with a status of open and priority of medium if not set
issuesRouter.post("/:id/comments", requirePermission("comment", "create"),validateBody(addCommentSchema),addComment);
issuesRouter.post("/:id/test-cases",requirePermission("testCase", "create"), addTestCase);
//POST /issues/:id/time-log
//Creates a new time log entry using its MongoDB id.
issuesRouter.post("/:id/time-log",requirePermission("timeLog", "create"),validateBody(postTimelogSchema),postTimeLogEntry); 

issuesRouter.patch("/:id",validateBody(updateIssueSchema),updateIssue);
issuesRouter.patch("/:id/status",validateBody(setStatusSchema),onlyWhenClosing(requirePermission("issue", "close")),setStatus);
issuesRouter.patch("/:id/classify",requirePermission("issue", "classify"),validateBody(classifyIssueSchema), setClassify);
issuesRouter.patch("/:id/assign", requirePermission("issue", "assign"),validateBody(assignIssueSchema),assignIssue);
issuesRouter.patch("/:id/test-cases/:testCaseId",validateBody(setTestCaseResultSchema),setTestCaseResult); 

issuesRouter.delete("/:id",requirePermission("issue", "delete"),deleteIssue)
issuesRouter.delete("/:id/comments/:commentId", deleteComment);

 
  export default issuesRouter;
