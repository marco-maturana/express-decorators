import { Request, Response } from "express";
import { Route, Get } from "../../index";

@Route("/controller")
export class Controller {
  @Get("/get")
  get (req: Request, res: Response): Response {
    return res.json(req.query);
  }
}

export default Controller;