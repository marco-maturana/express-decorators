import axios from "axios";
import { expect } from "chai";

describe("middleware decorators tests", function () {
  before(function () {
    axios.defaults.baseURL = 'http://localhost:8000/auth-controller';
  })

  it ("controller authentication", async function () {
    const response = await axios.get("/controller-auth")

    expect(response.status).to.equal(200);
    expect(response.data).to.include.all.keys("auth");
    expect(response.data.auth).to.equal(1);
  });

  it ("method authentication", async function () {
    const response = await axios.post("/controller-method-auth")

    expect(response.status).to.equal(200);
    expect(response.data).to.include.all.keys("auth");
    expect(response.data.auth).to.equal(2);
  });
});
