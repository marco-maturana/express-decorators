import { IMiddleware, IMethod } from "./interfaces";
import { Express, Router } from "express";
import path from "path";
import glob from "glob";
import ControllerExplorer from "./controller-explorer";

interface IRouteExplorerOptions {
  server: Express;
  controllersPath?: string | string[];
  middlewareAuthentication?: IMiddleware
}

export class RouteExplorer {
  private readonly controllersPath: string | string[];
  private readonly middlewareAuthentication: IMiddleware;

  private readonly server: Express;

  constructor (options: IRouteExplorerOptions) {
    this.server = options.server;

    this.controllersPath = options.controllersPath || this.defaultControllerPath;
    this.middlewareAuthentication = options.middlewareAuthentication;
  }

  private async createRouter (controllerPath: string): Promise<void> {

    const ControllerClass = (await import(controllerPath)).default;

    const controllerExplorer = new ControllerExplorer(ControllerClass, this.middlewareAuthentication);

    if (ControllerClass) {
      const controllerPath = controllerExplorer.path();

      if (controllerPath) {
        const methods = controllerExplorer.methods();

        if (methods.length) {
          const router = Router();
          const controller = new ControllerClass();
          const middlewares = controllerExplorer.middlewares(ControllerClass);

          middlewares.forEach((middleware: IMiddleware) => {
            router.use(middleware);
          });

          methods.forEach((method: IMethod) => {
            (<any>router)[method.requestMethod](method.methodPath, method.middlewares, controller[method.methodName].bind(controller));
          });

          this.server.use(controllerPath, router);
        }
      }
    }
  }

  private get defaultControllerPath (): string {
    return path.join(path.resolve("./"), "./dist/src/controllers/**/*js");
  }

  private async searchControllers (directory: string): Promise<void> {
    return new Promise((resolve: any, reject: any) => {
      glob(directory, async (err: Error, controllers: string[]) => {
        if (err) reject(err);

        for (let index = 0; index < controllers.length; index++) {
          await this.createRouter(controllers[index]);
        }

        resolve();
      });
    });
  }

  async loadControllers (): Promise<void> {
    if (typeof this.controllersPath === "string") {
      await this.searchControllers(this.controllersPath);
    } else {
      const promises: Promise<void>[] = [];

      for (let i = 0; i < this.controllersPath.length; i++) {
        promises.push(this.searchControllers(this.controllersPath[i]));
      }

      await Promise.all(promises);
    }
  }
}

export default RouteExplorer;
