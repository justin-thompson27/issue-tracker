import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getDb } from "./db.js";
import { admin } from "better-auth/plugins";          // new
import { ac, roles } from "./permissions.js";          // new

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set - add it to your .env file`);
  return value;
}
 
const db = await getDb();
 
export const auth = betterAuth({ //is the configuration of 
  
  baseURL: requireEnv("BETTER_AUTH_URL"),
  secret: requireEnv("BETTER_AUTH_SECRET"),
  trustedOrigins: [requireEnv("CLIENT_ORIGIN")],
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true },
   plugins: [                                           // new
    admin({
      ac,
      roles,
      // No defaultRole on purpose: a new sign-up has no role
      // until a Technical Manager gives one.
      adminRoles: ["technicalManager"],
     }),
  ],
  logger: { level: "debug" },
  onAPIError: {
    onError: (error) => console.error("AUTH ERROR:", error),
  },
});
