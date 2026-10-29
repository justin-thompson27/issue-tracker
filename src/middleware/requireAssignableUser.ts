import type { Request, Response, NextFunction } from "express";
import { assignableRoles } from "../permissions.js";
import { getUserRole } from "../userLookup.js";
 
// An issue may only be assigned to a Developer, Business Analyst
// or Quality Analyst.
export async function requireAssignableUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const role = await getUserRole(req.body.userId);
    if (role === undefined) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!(assignableRoles as readonly string[]).includes(role)) { //if the role found does not match the assignableRoles it sends a 400
      return res.status(400).json({
        error:
          "Issues can only be assigned to a Developer, Business Analyst " +
          "or Quality Analyst",
      });
    }
    next();
  } catch (err) {
    next(err);
  }
}
