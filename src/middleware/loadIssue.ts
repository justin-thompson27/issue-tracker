import type { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import type { Issue } from "../data/issue.js";
import { getIssuesCollection } from "../db.js";
 
// Finds the issue named in the URL. If it cannot, it has already answered
// the request (400 or 404) and returns undefined.
export async function findIssue( req: Request,  res: Response,): Promise<Issue | undefined> { //returns a Promise of an Issue object or returns undefined
  let id: ObjectId;
  try {
    id = new ObjectId(req.params.id as string); //tries to convert the req.params.id to sa string
  } catch {
    res.status(400).json({ error: "Invalid issue id" }); //if not found sends 400 and returns undefined
    return undefined;
  }
  const issue = await getIssuesCollection().findOne({ _id: id }); //if not found sends 400 and returns undefined
  if (!issue) {
    res.status(404).json({ error: "Issue not found" });
    return undefined;
  }
  return issue; // if found returns the promise of Issue
}
 
// Middleware: put the issue on req.issue so the next function can look at it.
export async function loadIssue(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const issue = await findIssue(req, res);
    if (!issue) return; //runs the findIssue function if it doesn't work returns and the rest of the function is stops running
    req.issue = issue; //otherwise it assigns the issue to req.issue property 
    next();
  } catch (err) {
    next(err);
  }
}
