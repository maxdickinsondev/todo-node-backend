import supertest from "supertest";
import app from "../../src/app";
import { AppError } from "../../src/errors/error";
import { error } from "../../src/middlewares/error";

describe("Error Middleware", () => {
  it("should be return an app error", async () => {
    app.get("/app_error", (req, res) => {
      throw new AppError("Task not found.", 404);
    });
    app.use(error);
    await supertest(app).get("/app_error").expect(404);
  });

  it("should be return an internal server error", async () => {
    app.get("/internal_server_error", (req, res) => {
      throw new Error("unknown error");
    });
    app.use(error);
    await supertest(app).get("/internal_server_error").expect(500);
  });
});
