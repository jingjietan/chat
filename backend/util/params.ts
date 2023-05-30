declare global {
  namespace Express {
    interface Request {
      postId: number;
      commentId: number;
    }
  }
}

import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const commentIdParser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const commentId = z.coerce.number().parse(req.params.commentId);
    req.commentId = commentId;
    next();
  } catch (error) {
    return res.sendStatus(400);
  }
}

export const postIdParser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = z.coerce.number().parse(req.params.postId);
    req.postId = postId;
    next();
  } catch (error) {
    return res.sendStatus(400);
  }
}