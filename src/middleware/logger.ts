import { Request, Response, NextFunction } from "express";
import debug from "debug";

const logger = debug("issue-tracker:logger");

export function requestLogger(req: Request, res: Response, next: NextFunction)
{
  logger(`${req.method}${req.url}`); //logs the info
  next(); // goes to the next route next 
}