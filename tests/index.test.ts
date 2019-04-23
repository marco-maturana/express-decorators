import server from "./src/server";

before("before", async function () {
  await server();
})