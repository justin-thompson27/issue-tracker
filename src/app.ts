/* import express from "express";
import { issuesRouter } from "./routes/issues.js";
import debug from "debug"; */

import express from "express";
import { issuesRouter } from "./routes/issues.js";
import debug from "debug";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/logger.js";
import path from "node:path";
import { getDb } from "./db.js";
import { get } from "node:http";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import { requireAuth } from "./middleware/requireAuth.js";
import { usersRouter } from "./routes/users.js";


export const app = express();

// Express runs these lines from top to bottom, so ORDER matters.
// The auth routes must come BEFORE express.json() below, because
// better-auth wants to read the request body before the JSON parser does.
//
// "/api/auth/*splat" means: any URL that starts with /api/auth/
// (sign-up/email, sign-in/email, get-session, ...).
// The * is a wildcard ("anything can go here"). Express 5 insists that a
// wildcard has a name, and "splat" is just that name. Any word would work.


const logger = debug("issue-tracker:index");
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json()); //converts the json body of the request into javascript object so that req.body can read it
app.use(requestLogger); //logs the kind of request and url so a post request from issues would be POST/issues/7
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "../vite-project/frontend/dist")));


app.use("/issues",requireAuth,issuesRouter); //assigns the router to issues so if the link is /issues it will go to teh issues route
//require Auth now runs before every line in the routes.
// app.get("*", (req, res) => {
//   res.sendFile(path.join(import.meta.dirname, "../frontend/dist/index.html"));
// });
app.get("/api/me", requireAuth, (req, res) => {
  res.json({ ...req.user, role: req.role });
});


app.get("/health", (req,res) => { //this is a request handler it gets called for every GET request unlike the callback function 
    res.json({
    status: "ok",
 
});
});

app.use("/users", requireAuth, usersRouter);

app.use(errorHandler); // swaps to the error handler if a error is thrown
