import { Request, Response } from "express";
import {
  Authentication,
  Get,
  Post,
  Route
} from "../../../index";

@Authentication()
@Route("/auth-controller")
export class MiddlewareController {

  @Get("/controller-auth")
  controllerAuth (req: Request, res: Response): Response {
    return res.json(req.body);
  }

  @Authentication()
  @Post("/controller-method-auth")
  controllerMethodAuth (req: Request, res: Response): Response {
    return res.json(req.body);
  }
}

export default MiddlewareController;