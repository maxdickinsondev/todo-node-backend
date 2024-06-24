import request from "supertest";
import app from "../../src/app";

describe("BodyParser Middleware", () => {
  it("should be parse body as json", async () => {
    app.post("/test_body_parser", (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post("/test_body_parser")
      .send({ name: "Max" })
      .expect({ name: "Max" });
  });
});
