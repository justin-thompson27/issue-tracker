// src/schema/userSchemas.ts
import { z } from "zod";
import { roleNames } from "../permissions.js";
 
export const setRoleSchema = z.object({
  role: z.enum(roleNames), //A role that is not one of the five is a 400 before better-auth is ever asked.
});
