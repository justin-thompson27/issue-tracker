import { Request,Response, NextFunction } from "express";
import { Issue} from "../data/issue.js";
import { getIssuesCollection } from "../db.js";
import { ObjectId } from "mongodb";


export async function listIssues(req: Request, res: Response)
{
    const issues = getIssuesCollection();
    res.json(await issues.find({}).toArray()); // finds all the issues in the issue array and showings them at /issues
    
}

export async function getIssueByID(req: Request, res: Response , next: NextFunction)
{
  
    let objectId : ObjectId;
    try {
      objectId = new ObjectId(req.params.id as string);
    } catch {
      return res.status(400).json({ error: "Invalid issue id" });

    }

    try {
    const issues = getIssuesCollection();
    const issue = await issues.findOne({ _id: objectId });
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }
    res.json(issue);
  } catch (err) {
    next(err);
  }
  
}
 




export async function createIssue(req: Request, res: Response)
{
   const{title,description,priority = "medium"} = req.body;
      
  
      if (!title) { //if title is null return and require a title
         return res.status(400).json({ error: "title is required"});
        
      }
      else{ //creates the new issue
        
        const issues = getIssuesCollection();
        const newIssue = await issues.insertOne({title,
        description: description || " ",
        status: "open",
        priority 
      })
      
      return res.status(201).json(newIssue);
      }
     
   
      

}



export  async function updateIssue(req: Request, res: Response, next: NextFunction)
{
  let objectId : ObjectId;
    try {
      objectId = new ObjectId(req.params.id as string);
    } catch (error) {
      return res.status(400).json({ error: "Invalid issue id" });

    }

    try {
       const updates = req.body;
       if ((updates.title !== undefined && typeof updates.title !== "string") ||
          (updates.description !== undefined && typeof updates.description !== "string") ||
          (updates.status !== undefined && !["open", "in-progress", "closed"].includes(updates.status)) ||
          (updates.priority !== undefined && !["low", "medium", "high"].includes(updates.priority))) 
       {
         return res.status(400).json({ error: "One or more update fields are invalid" });
       }
       const issueToUpdate = await getIssuesCollection().findOneAndUpdate({_id : objectId},{$set : updates}, { returnDocument: "after" }) //if u dont add returnDocument it returns the old doc without the update
        if (!issueToUpdate) {
          return res.status(404).json({ error: "Issue not found" });
        }
       
   
    
      
       res.status(200).json(issueToUpdate);
    } catch (error) {
      next(error);
    }

}

export async function deleteIssue(req:Request,res: Response , next: NextFunction)
  {

    let objectId : ObjectId;
    try {
      objectId = new ObjectId(req.params.id as string);
    } catch (err) {
      return res.status(400).json({ error: "Invalid issue id" });

    }
   
    try {
       const issues = getIssuesCollection();
       const issueToDelete = await issues.deleteOne({_id : objectId})
    if (issueToDelete.deletedCount === 0) {
        return res.status(404).json({ error: "Issue not found"}) //if the id number doesn't exist returns 404
    }
    res.status(204).send();
    } catch (err) {
      next(err);
    }
  

  }
  
  
  
  
  
  