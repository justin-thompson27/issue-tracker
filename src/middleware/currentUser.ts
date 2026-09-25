import { Request, Response, NextFunction } from "express";
import { IssueUserRef } from "../data/issue";
export function attachCurrentUser(req: Request, res: Response, next: NextFunction) {

  const issueUserRef: IssueUserRef = {
    userId: "6aad780ce470879405ff14af",
    fullName: "Miyabi Hoshimi",
  };
  req.user = issueUserRef;
  next();
}
