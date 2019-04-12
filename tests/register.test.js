const request = require("supertest")(require("../server"));

describe("GET Routes", () => {
  it("Should return status of 200", async done => {
    const getRequest = await request.get("api/");
    expect(getRequest.statusCode).toBe(200);
    done();
  });
});
