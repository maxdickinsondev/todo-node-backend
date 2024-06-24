import Joi from "joi";
import app from "../../src/app";
import { validator } from "../../src/middlewares/validator";
import supertest from "supertest";

const userSchema = Joi.object({
  age: Joi.number().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});

describe("Validator Middleware", () => {
  beforeEach(() => {
    app.post("/test_validate", validator(userSchema), (req, res) => {
      res.status(200).send("Success!");
    });
  });

  it("should be return 200 if user is valid", async () => {
    const response = await supertest(app)
      .post("/test_validate")
      .send({ age: 29, name: "Max", password: "123" });
    expect(response.status).toBe(200);
    expect(response.text).toBe("Success!");
  });

  it("should be return 400 if age is missing", async () => {
    const response = await supertest(app)
      .post("/test_validate")
      .send({ name: "Max", password: "123" });
    expect(response.status).toBe(400);
  });

  it("should be return 400 if name is missing", async () => {
    const response = await supertest(app)
      .post("/test_validate")
      .send({ password: "123", age: 29 });
    expect(response.status).toBe(400);
  });

  it("should be return 400 if password is missing", async () => {
    const response = await supertest(app)
      .post("/test_validate")
      .send({ name: "Max", age: 29 });
    expect(response.status).toBe(400);
  });
});
