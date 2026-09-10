import { Request,Response ,NextFunction } from "express";



export function errorHandler(  err: Error,  req: Request,  res: Response,  next: NextFunction //only knows it is a error handler because there are 4 parameters that is why this is declared k despite not using it 
)
  {
    console.error(err);
    res.status(500).json({statuscode: "500: Internal Server Error"});
  }

