import { AppError } from "../../src/errors/error";

describe("errors", () => {
  it("should be return correctly message", () => {
    const error = new AppError("Task not found", 404);
    expect(error.message).toBe("Task not found");
    expect(error.status).toBe(404);
  });
});
