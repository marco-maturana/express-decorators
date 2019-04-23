import axios from "axios";
import { expect } from "chai";

describe("middleware decorators tests", function () {
  before(function () {
    axios.defaults.baseURL = 'http://localhost:8000/middleware-controller';
  })

  it ("controller middleware", async function () {
    const response = await axios.get("/controller-middleware")

    expect(response.status).to.equal(200);
    expect(response.data).to.include.all.keys("middleware1");
    expect(response.data.middleware1).to.equal(true);
  });

  it ("one middleware method", async function () {
    const response = await axios.put("/one-middleware")

    expect(response.status).to.equal(200);
    expect(response.data).to.include.all.keys("middleware1", "middleware2");
    expect(response.data.middleware1).to.equal(true);
    expect(response.data.middleware2).to.equal(true);
  });

  it ("array of middlewares method", async function () {
    const response = await axios.post("/array-middlewares")

    expect(response.status).to.equal(200);
    expect(response.data).to.include.all.keys("middleware1", "middleware2", "middleware3");
    expect(response.data.middleware1).to.equal(true);
    expect(response.data.middleware2).to.equal(true);
    expect(response.data.middleware3).to.equal(true);
  });
});
