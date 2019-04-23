import { Request, Response, NextFunction } from "express";

export default function (req: Request, _res: Response, next: NextFunction): void {
  req.body = req.body || { };
  req.body.middleware3 = true;

  next();
}