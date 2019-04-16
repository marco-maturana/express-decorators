import { Request, Response, NextFunction } from "express";
import { MIDDLEWARES_DECORATOR } from "./constants";

interface Middleware {
  (req: Request, res: Response, next: NextFunction): any;
}

export function Middleware (middlewares: IMiddlewares | IMiddlewares []) {
  return (target: any, key?: string | symbol) => {
    Reflect.defineMetadata(MIDDLEWARES_DECORATOR, middlewares, target, key);
  };
}

export default Middleware;