import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { RouteExplorer } from "../../index";
import authentication from "./middlewares/authentication";

export default async function () {
  const controllersPath = path.join(path.resolve("./"), "./dist/tests/src/controllers/**/*.js");

  const server = express();

  const routeExplorer = new RouteExplorer({
    controllersPath,
    server,
    middlewareAuthentication: authentication,
  });

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  await routeExplorer.loadControllers();

  return server.listen("8000", () => {
    console.log(`The server is running on port 8000!`);
  });
}
