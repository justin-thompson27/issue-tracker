

import { Router,Request,Response, NextFunction , RequestHandler } from "express";
import { error } from "node:console";
import { Issue} from "../data/issue.js";
import {createIssueSchema , updateIssueSchema, setStatusSchema, classifyIssueSchema , assignIssueSchema, addCommentSchema, setTestCaseResultSchema, listIssuesQuerySchema, postTimelogSchema, issueIdParamsSchema} from "../schema/issueSchemas.js";
import { listIssues , getIssueByID , createIssue, updateIssue, deleteIssue , setStatus , setClassify , assignIssue, addComment, deleteComment , addTestCase, setTestCaseResult, listIssuesQuery, postTimeLogEntry, getTimeLogSummary } from "../controllers/issueController.js";
import { validateBody, validateParams, validateQuery } from "../middleware/validate.js";
import { set } from "zod";
import { requirePermission } from "../middleware/requirePermission.js";
import { loadIssue } from "../middleware/loadIssue.js";
import {   requireIssueRule,  requirePermissionOr,} from "../middleware/requireIssueRule.js";
import { canEditIssue, canWorkOnIssue , canDeleteComment } from "../issueRules.js";
import { requireAssignableUser } from "../middleware/requireAssignableUser.js";



function onlyWhenClosing(check: RequestHandler): RequestHandler {
  return (req, res, next) =>
    req.body.status === "closed" ? check(req, res, next) : next();
}


function exceptWhenClosing(check: RequestHandler): RequestHandler {
  return (req, res, next) =>
    req.body.status === "closed" ? next() : check(req, res, next); //checks if the json request body is closed if it is next()runs otherwise check runs
}
 
// Reused wherever the rule is "only the person this issue is assigned to".
const assigneeOnly = [ //this variable will be called has an arrary of funtions that it runs in order
  loadIssue, //finds the issue
  requireIssueRule( 
    canWorkOnIssue, //checks if the req.user is the same as the issue author id
    "Only the person this issue is assigned to may do that", //sends this if not
  ),
];


export const issuesRouter = Router(); //creates a router object that can be called from other files


//Get
/* issuesRouter.get("/", listIssues);  */
issuesRouter.get("/:id",getIssueByID);

issuesRouter.get("/", validateQuery(listIssuesQuerySchema), listIssuesQuery)
// GET /issues/:id/time-log/summary
// Validates the MongoDB issue ID before calculating the time-log summary.
issuesRouter.get("/:id/time-log/summary",validateParams(issueIdParamsSchema),  getTimeLogSummary);




//POST
issuesRouter.post("/",requirePermission("issue", "create"),validateBody(createIssueSchema),createIssue);  //creates a new issue with a status of open and priority of medium if not set
issuesRouter.post("/:id/comments", requirePermission("comment", "create"),validateBody(addCommentSchema),addComment);

issuesRouter.post("/:id/test-cases",requirePermission("testCase", "create"),assigneeOnly, addTestCase);
//POST /issues/:id/time-log
//Creates a new time log entry using its MongoDB id.
issuesRouter.post("/:id/time-log",requirePermission("timeLog", "create"),validateBody(postTimelogSchema),postTimeLogEntry); 


//PATCH
issuesRouter.patch("/:id",validateBody(updateIssueSchema),loadIssue, requireIssueRule( canEditIssue,"Only the author may edit this issue" ),updateIssue);

issuesRouter.patch("/:id/status",validateBody(setStatusSchema),onlyWhenClosing(requirePermission("issue", "close")),exceptWhenClosing(loadIssue),exceptWhenClosing(requireIssueRule(canWorkOnIssue,"Only the person this issue is assigned to may do that")),setStatus);

issuesRouter.patch("/:id/classify",requirePermission("issue", "classify"),validateBody(classifyIssueSchema), setClassify);

issuesRouter.patch("/:id/assign", requirePermissionOr("issue","assign",(req) => canWorkOnIssue(req.issue, req.user),"Only a manager, or the person this issue is assigned to, may assign it", ),validateBody(assignIssueSchema), requireAssignableUser,assignIssue);
//The "or" half. It runs only when the role check said no, and by then requirePermissionOr has loaded the issue into req.issue.
//404 User not found if userId is not a real person. 400 if the person is not a Developer, Business Analyst or Quality Analyst.
issuesRouter.patch("/:id/test-cases/:testCaseId",requirePermission("testCase","setResult"),assigneeOnly, validateBody(setTestCaseResultSchema),setTestCaseResult); 


//DELETE
issuesRouter.delete("/:id",requirePermissionOr("comment","deleteAny", (req) =>canDeleteComment(req.issue, req.params.commentId as string, req.user), "Only the comment's author or a Technical Manager may delete it",
  ),deleteIssue);

issuesRouter.delete("/:id/comments/:commentId", deleteComment);

 
  export default issuesRouter;
