import { NextFunction, Request, Response } from "express";
import {
  All,
  Delete,
  Get,
  Head,
  Options,
  Patch,
  Post,
  Put,
  Route
} from "../../index";

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
    return res.json(req.body);
  }

  @Delete("/delete/:key")
  delete (req: Request, res: Response): Response {
    return res.json({ key: req.params.key });
  }

  @Options("/options")
  options (req: Request, res: Response): Response {
    return res.json(req.body);
  }

  @Head("/head")
  head (_req: Request, res: Response): Response {
    return res.sendStatus(200);
  }

  @All("/all")
  all (req: Request, _res: Response, next: NextFunction): void {
    req.body = req.body || { }
    req.body.all = "ok"

    next()
  }

  @Put("/all")
  testAll (req: Request, res: Response): Response {
    return res.json(req.body);
  }
}

export default Controller;