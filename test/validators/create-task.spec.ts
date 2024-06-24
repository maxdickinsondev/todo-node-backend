import app from "../../src/app";
import { validator } from "../../src/middlewares/validator";
import supertest from "supertest";
import { createTaskSchema } from "../../src/validators/create-task";

describe("CreateTask Validator", () => {
  beforeEach(() => {
    app.post("/create_task", validator(createTaskSchema), (req, res) => {
      res.status(200).send("Success!");
    });
  });

  it("should be return 200 if task is valid", async () => {
    const response = await supertest(app)
      .post("/create_task")
      .send({ title: "Learn Node.js" });
    expect(response.status).toBe(200);
    expect(response.text).toBe("Success!");
  });

  it("should be return 400 if title is missing", async () => {
    const response = await supertest(app)
      .post("/create_task")
      .send({ name: "Max" });
    expect(response.status).toBe(400);
  });
});
