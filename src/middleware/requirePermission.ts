import type { Request, Response, NextFunction } from "express";
import { auth } from "../auth.js";
import { statement } from "../permissions.js";
 
type Resource = keyof typeof statement;
 
export function requirePermission<R extends Resource>( //factory function which is a function that returns a function 
  resource: R, //R is Issue 
  action: (typeof statement)[R][number], //Only an action that really exists on that resource is accepted. requirePermission("issue", "clsoe") will not compile. action would be close or classify or create etc.
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await auth.api.userHasPermission({ //Asks the Admin plugin: "does this person's current role include this permission?" It answers { success: true } or { success: false }.
      body: {
        userId: req.user.userId,
        permissions: { [resource]: [action] },
      },
    });
 
    if (!result.success) {
      return res
        .status(403) //The message names the missing permission, so a person (and you, while testing) can see exactly which door was shut.
        //403 with Your role may not issue:close
        .json({ error: `Your role may not ${resource}:${action}` });
    }
    next();
  };
}
