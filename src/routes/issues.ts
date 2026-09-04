

import { Router,Request,Response } from "express";




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
export const issuesRouter = Router();

issuesRouter.get("/", (_req, res) => {
  res.json(issues);
});

issuesRouter.get("/:id",(req: Request, res: Response) =>
{
  const issue = issues.find((i) => i.id === Number(req.params.id));
  if (issue) 
    {
      res.json(issue);
    }
    else
    {
      res.status(404).json({message: "Issue not found"});
    }
    
  }
)

issuesRouter.post("/",(req: Request, res: Response) =>
  {

    const{title,description,priority = "medium"} = req.body;
    const newIssue: Issue = {
      id : counter++,
      title,
      description,
      status: "open",
      priority
    }
    issues.push(newIssue);
    res.status(201).json(newIssue);


  })