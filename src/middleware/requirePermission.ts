import type { Request, Response, NextFunction } from "express";
import { auth } from "../auth.js";
import { statement } from "../permissions.js";
 
type Resource = keyof typeof statement; //resource is a generic being set equal to the issues type from the permissions.js 
 
// Asks the Admin plugin: does this person's current role include this permission?
export async function userCan<R extends Resource>(  //R extends Resource means that R has to be of type Resource
  userId: string, 
   resource: R, //R extends Resource means that R has to be of type Resource
    action: (typeof statement)[R][number],) //Only an action that really exists on that resource is accepted. requirePermission("issue", "clsoe") will not compile. action would be close or classify or create etc.
  //extracts the types that statement can be for example if issue is create assign and classify it would extract those three types and the action would have to match
    : Promise<boolean> { //promise to return a boolean of true of false depending if the user's role has permissions
  const result = await auth.api.userHasPermission({ //Asks the Admin plugin: "does this person's current role include this permission?" It answers { success: true } or { success: false }.
    body: { userId, permissions: { [resource]: [action] } }, //checks if the user has the same resource and action 
  });
  return result.success;
}
 
// A factory, like validateBody(schema): you call it with ONE permission
// and it hands back a middleware that checks exactly that permission.
export function requirePermission<R extends Resource>( //is a factory function because it returns a function
  resource: R,
  action: (typeof statement)[R][number],
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!(await userCan(req.user.userId, resource, action))) { //if the user does not have permissions than a 403 is returned
      return res
        .status(403)
        .json({ error: `Your role may not ${resource}:${action}` });
    }
    next();
  };
}
