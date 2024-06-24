import { getMockReq, getMockRes } from "@jest-mock/express";
import { MockProxy, mock } from "jest-mock-extended";
import { TaskController } from "../../src/controllers/task-controller";
import { TaskService } from "../../src/services/task-service";
import { Task } from "../../src/models/task";
import { Response } from "express";

interface CustomResponse extends Response {
  tasks: Array<Task>;
}

describe("Task Controller", () => {
  let sut: TaskController;
  let taskService: MockProxy<TaskService>;

  beforeAll(() => {
    taskService = mock();
  });

  beforeEach(() => {
    sut = new TaskController(taskService);
  });

  describe("getTasks()", () => {
    it("should be list all tasks", async () => {
      const req = getMockReq();
      const { res } = getMockRes<CustomResponse>({
        statusCode: 200,
        tasks: [{ id: 1, title: "Learn React.js", completed: false }],
      });
      await sut.getTasks(req, res);
      expect(res.statusCode).toBe(200);
      expect(res.tasks).toStrictEqual([
        { id: 1, title: "Learn React.js", completed: false },
      ]);
    });
  });

  describe("createTask()", () => {
    it("should be create a task", async () => {
      const req = getMockReq({ body: { title: "Learn Docker" } });
      const { res } = getMockRes<CustomResponse>({
        statusCode: 201,
        tasks: [{ id: 1, title: "Learn Docker", completed: false }],
      });
      await sut.createTasks(req, res);
      expect(res.statusCode).toBe(201);
      expect(res.tasks).toStrictEqual([
        { id: 1, title: "Learn Docker", completed: false },
      ]);
    });
  });

  describe("updateTask()", () => {
    it("should be update a task", async () => {
      const req = getMockReq({
        params: { id: "1" },
        body: { title: "Learn Docker Compose", completed: false },
      });
      const { res } = getMockRes<CustomResponse>({
        statusCode: 201,
        tasks: [{ id: 1, title: "Learn Docker Compose", completed: false }],
      });
      await sut.updateTask(req, res);
      expect(res.statusCode).toBe(201);
      expect(res.tasks).toStrictEqual([
        { id: 1, title: "Learn Docker Compose", completed: false },
      ]);
    });
  });

  describe("deleteTask()", () => {
    it("should be delete a task", async () => {
      const req = getMockReq({ params: { id: "1" } });
      const { res } = getMockRes({
        statusCode: 201,
        statusMessage: "success",
      });
      await sut.deleteTask(req, res);
      expect(res.statusCode).toBe(201);
      expect(res.json).toHaveBeenCalledWith({
        status: 201,
        message: "success",
      });
    });
  });
});
