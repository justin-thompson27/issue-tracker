import {Request, Response, NextFunction} from "express";
import { error } from "node:console";
import path from "node:path";
import { object, ZodType} from "zod";

export function validateBody(schema: ZodType) //takes an argument of a zod schema this is a factory function because it is a function that returns a function
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



export function validateQuery(schema: ZodType)
{
  return(req: Request, res: Response , next: NextFunction) =>{
  const result = schema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json(
      {
        error: "ValidationFailed",
        details: result.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,

        })),
      });
  }
  Object.defineProperty(req,"query",{ //selects the request object query property 
    value: result.data, //sets the value of query to the result's data
    writable: true, //allows the value of query to be changed later 
    configurable: true, //the definition of this property can be deleted or modified 
    enumerable: true, // controls if the property of the object are displayed
  });
  next();
};
}

// Validates URL parameters before the request reaches the controller.
// This is used to check MongoDB issue IDs in the route.
export function validateParams(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Validate the URL parameters using the supplied Zod schema.
    const result = schema.safeParse(req.params);

    // Return a 400 response if validation fails.
    if (!result.success) {
      return res.status(400).json({
        error: "ValidationFailed",
        details: result.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    // Validation passed, so continue to the controller.
    next();
  };
}