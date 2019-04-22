import axios from "axios";
import server from "./src/server";
import { expect } from "chai";

describe("decorators tests", function () {
  before(async function () {
    await server();

    axios.defaults.baseURL = 'http://localhost:8000/controller';
  })

  it ("get", async function () {
    const response = await axios.get("/get", {
      params: { message: "ok" }
    })

    expect(response.data).to.include.all.keys("message");
    expect(response.data.message).to.equal("ok");
  });

  it ("post", async function () {
    const response = await axios.post("/post", {
      message: "ok"
    })

    expect(response.data).to.include.all.keys("message");
    expect(response.data.message).to.equal("ok");
  });

  it ("put", async function () {
    const response = await axios.put("/put", {
      message: "ok"
    })

    expect(response.data).to.include.all.keys("message");
    expect(response.data.message).to.equal("ok");
  });

  it ("patch", async function () {
    const response = await axios.patch("/patch", {
      data: { message: "ok" }
    })

    expect(response.data).to.include.all.keys("message");
    expect(response.data.message).to.equal("ok");
  });

  it ("delete", async function () {
    const response = await axios.delete("/delete/0")

    expect(response.data).to.include.all.keys("key");
    expect(response.data.key).to.equal("0");
  });
});
