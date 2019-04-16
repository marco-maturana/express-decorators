import { ROUTE_DECORATOR } from "./constants";

export function Route (prefix?: string) {
  const path = (prefix) ? prefix : "/";

  return (target: any) => {
    Reflect.defineMetadata(ROUTE_DECORATOR, path, target);
  };
}

export default Route;