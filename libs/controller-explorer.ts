import {
  AUTHENTICATION_DECORATOR,
  MIDDLEWARE_DECORATOR,
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

  methods (): IMethod[] {
    const methods: IMethod[] = [ ];

    const properties = Object.getOwnPropertyNames(this.controllerClass.prototype);

    properties.forEach((property: string) => {
      const metadata = Reflect.getMetadata(ROUTE_DECORATOR, this.controllerClass.prototype, property);

      if (metadata) methods.push({
        methodName: property,
        methodPath: metadata.path,
        middlewares: this.middlewares(property),
        requestMethod: metadata.method
      });
    });

    return methods;
  }

  middlewares (propertyKey?: string) {
    const controllerClass = (propertyKey) ? this.controllerClass.prototype : this.controllerClass;

    const middlewares: IMiddleware[] = [ ];

    const authentication = Reflect.getMetadata(AUTHENTICATION_DECORATOR, controllerClass, propertyKey);

    if (authentication) {
      if (!this.middlewareAuthentication) {
        console.log("Authentication decorator set without standard middleware for authentication!");
      } else {
        middlewares.push(this.middlewareAuthentication);
      }
    }

    const middleware = Reflect.getMetadata(MIDDLEWARE_DECORATOR, controllerClass, propertyKey);

    if (middleware) middlewares.push(middleware);

    return middlewares;
  }

  path (): string {
    return Reflect.getMetadata(ROUTE_DECORATOR, this.controllerClass);
  }
}

export default ControllerExplorer;
