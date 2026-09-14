import { Request,Response, NextFunction } from "express";
import { Issue,issues, getNextId } from "../data/issue.js";


export function listIssues(req: Request, res: Response)
{
 
    res.json(issues); // finds all the issues in the issue array and showings them at /issues
  
}




export function getIssueByID(req: Request, res: Response , next: NextFunction)
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




export function createIssue(req: Request, res: Response)
{
   const{title,description,priority = "medium"} = req.body;
      
  
      if (!title) { //if title is null return and require a title
         return res.status(400).json({ error: "title is required"});
        
      }
      else{ //creates the new issue
        const newIssue: Issue = {
        id : getNextId(), //always increase the counter by 1 for every new issue
        title,
        description,
        status: "open",
        priority
        }
        issues.push(newIssue); //adds the new issue to the issues arrary
        res.status(201).json(newIssue); //successful post message with the body of newissue 
      }
      

}

type PatchIssueBody = Partial<Pick<Issue, "title" | "description" | "status" | "priority">>;

export function updateIssue(req: Request<{ id: string }, Issue | { error: string }, PatchIssueBody>, res: Response)
{
  const updates = req.body;

  if (!updates || typeof updates !== "object" || Array.isArray(updates) || Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "Request body must be a non-empty object" });
  }

  const allowedFields = ["title", "description", "status", "priority"];
  if (Object.keys(updates).some((field) => !allowedFields.includes(field))) {
    return res.status(400).json({ error: "Only title, description, status, and priority can be updated" });
  }

  if (
    (updates.title !== undefined && typeof updates.title !== "string") ||
    (updates.description !== undefined && typeof updates.description !== "string") ||
    (updates.status !== undefined && !["open", "in-progress", "closed"].includes(updates.status)) ||
    (updates.priority !== undefined && !["low", "medium", "high"].includes(updates.priority))
  ) {
    return res.status(400).json({ error: "One or more update fields are invalid" });
  }

  const issue = issues.find((currentIssue) => currentIssue.id === Number(req.params.id));
  if (!issue) {
    return res.status(404).json({ error: "Issue not found" });
  }

  Object.assign(issue, updates);
  return res.json(issue);
}

export function deleteIssue(req:Request,res: Response , next: NextFunction)
  {
    try {
      const issueIndex = issues.findIndex((i) => i.id === Number(req.params.id)); //searches the id
    if (issueIndex === -1) {
      return res.status(404).json({ error: "Issue not found"}) //if the id number doesn't exist returns 404
    }
    issues.splice(issueIndex,1); //removes id at the index if found
    res.status(204).send(); //successful removal
    } catch (err) {
      next(err)
    }
  }
  
  
  
  
  
  