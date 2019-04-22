import { AUTHENTICATION_DECORATOR } from "./constants";

export function Authentication () {
  return (target: any, key?: string | symbol) => {
    Reflect.defineMetadata(AUTHENTICATION_DECORATOR, true, target, key);
  };
}

export default Authentication;