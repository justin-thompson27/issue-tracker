import {Request, Response, NextFunction} from "express";
import { ZodType} from "zod";

export function validateBody(schema: ZodType) //takes an argument of a zod schema 
{
    return(req: Request, res: Response, next: NextFunction) => //returns the express request/response function 
    {
      const result = schema.safeParse(req.body); //checks if the request body matches the schema 
 

      if (!result.success) { //uses the .success property of result to decide if the validation failed 
         
        return res.status(400).json({ //returns a 400 error because the inputted data was invalid which is a bad request 
          error: "ValidationFailed", // name of the error is ValidationFailed
          details: result.error.issues.map((issue) => ({ //creates an array of issues with their path and  their corresponding error message
          path: issue.path.join("."),  //if the array path has multiple fields it adds them together into one string using dot notation
          message: issue.message, // adds the actual error message to the specific issue object in the array that it belongs to 
          })),
        });
      }
      
      req.body = result.data;
      next();
    };
}