import { MIDDLEWARE_DECORATOR } from "./constants";
import { IMiddleware } from "./interfaces";

export function Middleware (middlewares: IMiddleware | IMiddleware []) {
  return (target: any, key?: string | symbol) => {
    Reflect.defineMetadata(MIDDLEWARE_DECORATOR, middlewares, target, key);
  };
}

export default Middleware;