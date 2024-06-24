import app from "../../src/app";
import { validator } from "../../src/middlewares/validator";
import supertest from "supertest";
import { updateTaskSchema } from "../../src/validators/update-task";

describe("UpdateTask Validator", () => {
  beforeEach(() => {
    app.put("/update_task/:id", validator(updateTaskSchema), (req, res) => {
      res.status(200).send("Success!");
    });
  });

  it("should be return 200 if task is valid", async () => {
    const response = await supertest(app).put("/update_task/1");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Success!");
  });

  it("should be return 400 if id is missing", async () => {
    const response = await supertest(app).put("/update_task/any");
    expect(response.status).toBe(400);
  });

  it("should be return 400 if param not expected", async () => {
    const response = await supertest(app)
      .put("/update_task/1")
      .send({ foo: "bar" });
    expect(response.status).toBe(400);
  });
});
