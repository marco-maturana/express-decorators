import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { RouteExplorer } from "../../index";

export default async function () {
  const controllersPath = path.join(path.resolve("./"), "./dist/tests/src/controller.js");

  const server = express();

  const routeExplorer = new RouteExplorer({
    controllersPath,
    server
  });

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  await routeExplorer.loadControllers();

  return server.listen("8000", () => {
    console.log(`The server is running on port 8000!`);
  });
}
