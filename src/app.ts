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

export const app = express();



const logger = debug("issue-tracker:index");
app.use(express.json()); //converts the json body of the request into javascript object so that req.body can read it
app.use(requestLogger); //logs the kind of request and url so a post request from issues would be POST/issues/7
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "../vite-project/frontend/dist")));


app.use("/issues",issuesRouter); //assigns the router to issues so if the link is /issues it will go to teh issues route
// app.get("*", (req, res) => {
//   res.sendFile(path.join(import.meta.dirname, "../frontend/dist/index.html"));
// });

app.get("/health", (req,res) => { //this is a request handler it gets called for every GET request unlike the callback function 
    res.json({
    status: "ok",
 
});
});

app.use(errorHandler); // swaps to the error handler if a error is thrown
