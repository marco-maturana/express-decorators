import { Request, Response } from "express";
import { Get, Post, Route } from "../../index";

@Route("/controller")
export class Controller {
  @Get("/get")
  get (req: Request, res: Response): Response {
    return res.json(req.query);
  }

  @Post("/post")
  post (req: Request, res: Response): Response {
    return res.json(req.body);
  }
}

export default Controller;