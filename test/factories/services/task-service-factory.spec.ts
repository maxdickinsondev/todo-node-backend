import { taskService } from "../../../src/factories/services/task-service-factory";
import { TaskService } from "../../../src/services/task-service";

describe("TaskService Factory", () => {
  it("should be return a task service instance", () => {
    expect(taskService).toBeInstanceOf(TaskService);
  });
});
