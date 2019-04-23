import { Request, Response } from "express";
import {
  Get,
  Middleware,
  Post,
  Put,
  Route
} from "../../../index";
import middleware1 from "../middlewares/middleware1";
import middleware2 from "../middlewares/middleware2";
import middleware3 from "../middlewares/middleware3";

@Middleware(middleware1)
@Route("/middleware-controller")
export class MiddlewareController {

  @Get("/controller-middleware")
  controllerMiddleware (req: Request, res: Response): Response {
    return res.json(req.body);
  }

  @Middleware(middleware2)
  @Put("/one-middleware")
  oneMiddleware (req: Request, res: Response): Response {
    return res.json(req.body);
  }

  @Middleware([middleware2, middleware3])
  @Post("/array-middlewares")
  arrayMiddlewares (req: Request, res: Response): Response {
    return res.json(req.body);
  }
}

export default MiddlewareController;