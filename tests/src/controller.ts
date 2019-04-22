import { Request, Response } from "express";
import {
  Delete,
  Get,
  Options,
  Patch,
  Post,
  Put,
  Route,
  Head
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
}

export default Controller;