import {
  AUTHENTICATION_DECORATOR,
  MIDDLEWARES_DECORATOR,
  ROUTE_DECORATOR
} from "./constants";
import { IMiddleware, IMethod } from "./interfaces";

export class ControllerExplorer {
  private readonly controllerClass: any;
  private readonly middlewareAuthentication: IMiddleware;

  constructor (controllerClass: any, middlewareAuthentication?: IMiddleware) {
    this.controllerClass = controllerClass;
    this.middlewareAuthentication = middlewareAuthentication;
  }

  middlewares (propertyKey?: string) {
    const middlewares: IMiddleware[] = [ ];

    const authentication = Reflect.getMetadata(AUTHENTICATION_DECORATOR, this.controllerClass, propertyKey);

    if (authentication) {
      if (!this.middlewareAuthentication) {
        console.log("Authentication decorator set without standard middleware for authentication!");
      } else {
        middlewares.push(this.middlewareAuthentication);
      }
    }

    const middleware = Reflect.getMetadata(MIDDLEWARES_DECORATOR, this.controllerClass, propertyKey);

    if (middleware) middlewares.push(middleware);

    return middlewares;
  }
}

export function middlewares (controllerClass: any, propertyKey?: string): IMiddleware [] {
  const middlewares: IMiddleware[] = [ ];

  const middleware = Reflect.getMetadata(MIDDLEWARES_DECORATOR, controllerClass, propertyKey);

  if (middleware) middlewares.push(middleware);

  return middlewares;
}

export function path (controllerClass: any): string {
  return Reflect.getMetadata(ROUTE_DECORATOR, controllerClass);
}

export function methods (controllerClass: any): IMethod[] {
  const methods: IMethod[] = [ ];

  const properties = Object.getOwnPropertyNames(controllerClass.prototype);

  properties.forEach((property: string) => {
    const metadata = Reflect.getMetadata(ROUTE_DECORATOR, controllerClass.prototype, property);

    if (metadata) methods.push({
      methodName: property,
      methodPath: metadata.path,
      middlewares: middlewares(controllerClass.prototype, property),
      requestMethod: metadata.method
    });
  });

  return methods;
}