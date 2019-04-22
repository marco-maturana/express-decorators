import { Request, Response } from "express";
import { Get, Patch, Post, Put, Route } from "../../index";

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

  @Put("/put")
  put (req: Request, res: Response): Response {
    return res.json(req.body);
  }

  @Patch("/patch")
  patch (req: Request, res: Response): Response {
    return res.json(req.body.data);
  }
}

export default Controller;