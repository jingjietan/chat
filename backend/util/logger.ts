import chalk from "chalk";
import dayjs from "dayjs";
import { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(chalk.yellow(`(${dayjs(new Date())})  Pinged ${req.method} ${req.url}!`));

  next();
}

export default logger