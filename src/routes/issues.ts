

import { Router,Request,Response, NextFunction } from "express";
import { Issue, issues , getNextId } from "../data/issue";
import { listIssues , getIssueByID , createIssue, updateIssue } from "../controllers/issueController";




export const issuesRouter = Router(); //creates a router object that can be called from other files

issuesRouter.get("/", (listIssues)); 

issuesRouter.get("/:id",(getIssueByID));
  
issuesRouter.post("/",(createIssue))  //creates a new issue with a status of open and priority of medium if not set

issuesRouter.patch("/:id", updateIssue);
 

  export default issuesRouter;