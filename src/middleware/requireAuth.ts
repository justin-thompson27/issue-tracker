import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../auth.js";
 
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session = await auth.api.getSession({ // getSession() looks up the available cookies and returns the it if found otherwise returns null
    headers: fromNodeHeaders(req.headers), //converts the request's headers into the form better-auth expects.
  });
 
  if (!session) { //if no session is found, then the user is not signed in, so return a 401 error
    return res.status(401).json({ error: "Please sign in first" });
  }
 
  req.user = { userId: session.user.id, fullName: session.user.name }; //sets the request user to the session user so that it can be used in the route handler the shape that IssueUserRef is the same as this 
  req.role = session.user.role ?? "none";     

  next();
}
