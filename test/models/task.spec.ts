import { Task } from "../../src/models/task";

describe("Task Model", () => {
  it("should be return a task type", () => {
    const task: Task = {
      id: 1,
      title: "Learn Docker",
      completed: true,
    };
    expect(task).toHaveProperty("id", 1);
    expect(task).toHaveProperty("title", "Learn Docker");
    expect(task).toHaveProperty("completed", true);
  });
});
