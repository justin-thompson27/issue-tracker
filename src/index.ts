import express from "express";
import { issuesRouter } from "./routes/issues.js";
import debug from "debug";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/logger.js";

const logger = debug("issue-track:index");
const app = express(); //creates express object for application

const PORT = process.env.PORT || 3000;

 
app.use(requestLogger); //logs the kind of request and url so a post request from issues would be POST/issues/7
app.use(express.json()); //converts the json body of the request into javascript object so that req.body can read it
app.use("/issues",issuesRouter); //assigns the router to issues so if the link is /issues it will go to teh issues route
app.use(errorHandler); // swaps to the error handler if a error is thrown

app.get("/health", //this is a request handler it gets called for every GET request unlike the callback function 
  (req,res) => {

  res.status(200); //base status for success is always 200 
  res.json( {status: "ok"}); //converts the json body of the webpage to this message
});

app.listen(PORT, 
  () => 

    {
      logger(`Messaged received on ${PORT}`); //is only called when the server starts because app.listen does not have a req or res object
      /* console.log(); */

    }
  )