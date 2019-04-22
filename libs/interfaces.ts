import { Request, Response, NextFunction } from "express";

export interface IMethod {
  methodName: string;
  middlewares: IMiddleware[];
  methodPath: string;
  requestMethod: string;
}

export interface IMiddleware {
  (req: Request, res: Response, next: NextFunction): any;
}