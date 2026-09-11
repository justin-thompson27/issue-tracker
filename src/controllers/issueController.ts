import { Request,Response, NextFunction } from "express";
import { Issue,issues, getNextId } from "../data/issue";


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