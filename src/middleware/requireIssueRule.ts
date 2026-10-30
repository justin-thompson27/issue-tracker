import type { Request, Response, NextFunction } from "express";
import type { Issue, IssueUserRef } from "../data/issue.js";
import { userCan } from "./requirePermission.js";
import { findIssue } from "./loadIssue.js";
import { statement } from "../permissions.js";
 
type Resource = keyof typeof statement;
 
// For rules about WHOSE issue it is. Runs after loadIssue.
export function requireIssueRule(
  check: (issue: Issue, user: IssueUserRef) => boolean, //check is a user made function that could be named anything, it needs a function that accepts issue and user it returns a boolean 
  message: string, //it also take an argument of message that will be sent if the 403 is sent 
) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!check(req.issue, req.user)) { // if false returns sends 403
      return res.status(403).json({ error: message });
    }
    next(); //if successful just continues to the next function
  };
}
 
// "A role that has the permission, OR the person the rule names."
// Used where both are allowed: assigning an issue (a manager, or the current
// assignee handing it off) and deleting a comment (its author, or a manager).
export function requirePermissionOr<R extends Resource>( //For the two rules where either may pass: "a role that has the permission, OR the person the rule names". First it asks userCan. A yes ends the question and next() runs. Only on a no does it load the issue and try the rule
  resource: R,
  action: (typeof statement)[R][number],
  check: (req: Request) => boolean, //checks for a function that accepts request and returns true
  message: string,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (await userCan(req.user.userId, resource, action)) return next(); //userCan sees if the req.user.userid has the allowed permissions if true goes to next function
 
      const issue = await findIssue(req, res);
      if (!issue) return;
      req.issue = issue; //Saved so the rest of the route can use the issue it just loaded.
 
      if (!check(req)) return res.status(403).json({ error: message });//checks if the req.user.id matches the author if not it returns false and sends the 403
      next();
    } catch (err) {
      next(err);
    }
  };
}
//so the checks if the user has the permissions if not it then checks if the user has the the matching id to the author if so the req.issue is set up to be passed to the next function if not it returns 403 saying that the ids don't match
