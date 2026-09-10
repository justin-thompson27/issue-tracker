

import { Router,Request,Response, NextFunction } from "express";
import { error } from "node:console";



interface Issue { //interface containing possible issues
  id: number;
  title: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
}

const issues : Issue[] = [ //array made using issue interface
  {id: 1, title: "Missing Login" ,description: "Login function not appearing",status: "open", priority:"high"},
  {id: 2, title: "Incorrect Password" ,description: "Password is being entered correctly but still is flagged as incorrect",status: "in-progress", priority:"high"},
  {id: 3, title: "Page failing to load" ,description: "Page infinitely loads over and over again",status: "closed", priority:"low"}

]

let counter: number = 4; //will become the counter for new ids
export const issuesRouter = Router(); //creates a router object that can be called from other files

issuesRouter.get("/", (_req, res) => {
  res.json(issues); // finds all the issues in the issue array and showings them at /issues
});

issuesRouter.get("/:id",(req: Request, res: Response , next: NextFunction) =>
{
  try {
    /* throw new Error("test"); */
    const issue = issues.find((i) => i.id === Number(req.params.id)); //searches array for a matching issues/(number)
  if (issue) 
    {
      res.json(issue); //if found returns the  issue
    }
    else
    {
      res.status(404).json({message: "Issue not found"}); //otherwise displays this
    }
    
    
  } catch (err) {
    next(err);
  }
  
  }
)

issuesRouter.post("/",(req: Request, res: Response) => //creates a new issue with a status of open and priority of medium if not set
  {

    const{title,description,priority = "medium"} = req.body;
    

    if (!title) { //if title is null return and require a title
       return res.status(400).json({ error: "title is required"});
      
    }
    else{ //creates the new issue
      const newIssue: Issue = {
      id : counter++, //always increase the counter by 1 for every new issue
      title,
      description,
      status: "open",
      priority
      }
      issues.push(newIssue); //adds the new issue to the issues arrary
      res.status(201).json(newIssue); //successful post message with the body of newissue 
    }
    


  })


  issuesRouter.delete("/:id",(req:Request,res: Response , next: NextFunction) =>
  {

    try {
      const issueIndex = issues.findIndex((i) => i.id === Number(req.params.id));
    if (issueIndex === -1) {
      return res.status(404).json({error: "no issue with that id exists"})
    }
    issues.splice(issueIndex,1);
    res.status(204);
    } catch (err) {
      next(err)
    }
    


  }
  
  
  
  
  
  )