import { TaskController } from "../../../src/controllers/task-controller";
import { taskController } from "../../../src/factories/controllers/task-controller-factory";

describe("TaskController Factory", () => {
  it("should be return a task controller instance", () => {
    expect(taskController).toBeInstanceOf(TaskController);
  });
});
