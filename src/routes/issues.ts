

import { Router,Request,Response, NextFunction } from "express";
import { error } from "node:console";
import { Issue} from "../data/issue";
import { listIssues , getIssueByID , createIssue, updateIssue, deleteIssue } from "../controllers/issueController.js";




export const issuesRouter = Router(); //creates a router object that can be called from other files

issuesRouter.get("/", (listIssues)); 

issuesRouter.get("/:id",(getIssueByID));
  
issuesRouter.post("/",(createIssue))  //creates a new issue with a status of open and priority of medium if not set

issuesRouter.patch("/:id", updateIssue);

issuesRouter.delete("/:id",deleteIssue)
 
  export default issuesRouter;
