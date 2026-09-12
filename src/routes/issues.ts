

import { Router,Request,Response, NextFunction } from "express";
import { error } from "node:console";
import { Issue, issues , getNextId } from "../data/issue";
import { listIssues , getIssueByID , createIssue, updateIssue } from "../controllers/issueController";




export const issuesRouter = Router(); //creates a router object that can be called from other files

issuesRouter.get("/", (listIssues)); 

issuesRouter.get("/:id",(getIssueByID));
  
issuesRouter.post("/",(createIssue))  //creates a new issue with a status of open and priority of medium if not set

issuesRouter.patch("/:id", updateIssue);
 

  })


  issuesRouter.delete("/:id",(req:Request,res: Response , next: NextFunction) =>
  {

    try {
      const issueIndex = issues.findIndex((i) => i.id === Number(req.params.id)); //searches the id
    if (issueIndex === -1) {
      return res.status(404).json({error: "no issue with that id exists"}) //if the id number doesn't exist returns 404
    }
    issues.splice(issueIndex,1); //removes id at the index if found
    res.status(204).send(); //successful removal
    } catch (err) {
      next(err)
    }
    


  }
  
  
  
  
  
  )
  export default issuesRouter;
