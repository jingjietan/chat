import { NextFunction, Request, Response } from "express";


const protect = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(400);
  }
}

export default protect