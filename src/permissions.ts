import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements } from "better-auth/plugins/admin/access";




//Everything a role cna allowed to do grouped by resource 
export const statement = {
 // The plugin's own "user" and "session" actions (set-role, ban, ...)
  ...defaultStatements,
   issue: ["create", "classify", "close", "assign", "delete"],
  comment: ["create", "deleteAny"],
  testCase: ["create", "setResult"],
  timeLog: ["create"],
  
} as const;

export const ac = createAccessControl(statement);
// Which role gets which actions. Anything not listed is refused.
export const roles = {
  developer: ac.newRole({ //Creates one role with exactly the actions you list. Anything not listed is refused (deny by default).
    issue: ["create"],
    comment: ["create"],
    timeLog: ["create"],
  }),
  businessAnalyst: ac.newRole({
    issue: ["create", "classify", "close", "assign"],
    comment: ["create"],
  }),
  qualityAnalyst: ac.newRole({
    issue: ["create"],
    comment: ["create"],
    testCase: ["create", "setResult"],
  }),
  productManager: ac.newRole({
    issue: ["create", "assign"],
    comment: ["create"],
  }),
  technicalManager: ac.newRole({
    issue: ["create", "assign", "delete"],
    comment: ["create", "deleteAny"],
    user: ["set-role"],
  }),
};
 
export type RoleName = keyof typeof roles; // 
export const roleNames = Object.keys(roles) as [RoleName, ...RoleName[]]; //The five role names as a list, so Zod can check a requested role in Step 6 without you typing the names twice.
