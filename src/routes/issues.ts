

import { Router,Request,Response, NextFunction } from "express";
import { error } from "node:console";
import { Issue} from "../data/issue";
import {createIssueSchema , updateIssueSchema, setStatusSchema, classifyIssueSchema , assignIssueSchema, addCommentSchema} from "../schema/issueSchemas.js";
import { listIssues , getIssueByID , createIssue, updateIssue, deleteIssue , setStatus , setClassify , assignIssue, addComment, deleteComment  } from "../controllers/issueController.js";
import { validateBody } from "../middleware/validate";
import { attachCurrentUser } from "../middleware/currentUser";




export const issuesRouter = Router(); //creates a router object that can be called from other files

issuesRouter.get("/", listIssues); 

issuesRouter.get("/:id",getIssueByID);
  
issuesRouter.post("/",attachCurrentUser,validateBody(createIssueSchema),createIssue);  //creates a new issue with a status of open and priority of medium if not set
issuesRouter.post("/:id/comments",attachCurrentUser,validateBody(addCommentSchema),addComment);

issuesRouter.patch("/:id",validateBody(updateIssueSchema),updateIssue);
issuesRouter.patch("/:id/status",validateBody(setStatusSchema),setStatus);
issuesRouter.patch("/:id/classify",validateBody(classifyIssueSchema),setClassify);
issuesRouter.patch("/:id/assign",validateBody(assignIssueSchema),assignIssue);

issuesRouter.delete("/:id",deleteIssue)
issuesRouter.delete("/:id/comments/:commentId", deleteComment);

 
  export default issuesRouter;
