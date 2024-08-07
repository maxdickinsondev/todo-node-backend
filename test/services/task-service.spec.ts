import { Knex } from "knex";
import { TaskService } from "../../src/services/task-service";

const mockKnex = {
  select: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  del: jest.fn().mockReturnThis(),
  offset: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  count: jest.fn().mockReturnValue([{ count: 0 }]),
};

const mockQueryBuilder = jest.fn().mockImplementation(() => mockKnex);

describe("TaskService", () => {
  let taskService: TaskService;

  beforeEach(() => {
    taskService = new TaskService(mockQueryBuilder as unknown as Knex);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("find()", () => {
    it("should be retrieve all tasks", async () => {
      mockKnex.select.mockResolvedValue([
        { id: 1, title: "Learn Jest", completed: true },
      ]);

      const tasks = await taskService.find({});

      expect(tasks).toStrictEqual({
        data: [{ id: 1, title: "Learn Jest", completed: true }],
        pagination: {
          page: 1,
          per_page: 20,
          offset: 0,
          next: 2,
          last_page: 0,
          total_count: 0,
        },
      });
    });
  });

  describe("create()", () => {
    it("should be create a task", async () => {
      mockKnex.insert.mockResolvedValue([2]);
      mockKnex.select.mockResolvedValue([
        { id: 2, title: "Learn Docker", completed: false },
      ]);

      const task = await taskService.create({ title: "Learn Docker" });

      expect(task).toStrictEqual({
        id: 2,
        title: "Learn Docker",
        completed: false,
      });
    });
  });

  describe("update()", () => {
    it("should be update a task", async () => {
      mockKnex.where.mockResolvedValueOnce([
        { id: 2, title: "Learn Docker", completed: false },
      ]);

      mockKnex.where.mockReturnValueOnce({
        update: jest.fn().mockResolvedValue({
          id: 2,
          title: "Learn Docker",
          completed: false,
        }),
      });

      mockKnex.where.mockReturnValueOnce({
        select: jest.fn().mockResolvedValue([
          {
            id: 2,
            title: "Learn Docker",
            completed: false,
          },
        ]),
      });

      const task = await taskService.update({
        id: 2,
        title: "Learn Docker",
        completed: true,
      });

      expect(mockQueryBuilder).toHaveBeenCalledWith("tasks");
      expect(task).toStrictEqual({
        id: 2,
        title: "Learn Docker",
        completed: false,
      });
    });

    it("should be throw exception when task not found", async () => {
      mockKnex.where.mockResolvedValueOnce([]);

      await expect(
        taskService.update({ id: 2, title: "Learn Docker", completed: true })
      ).rejects.toThrow("Task not found.");

      expect(mockQueryBuilder).toHaveBeenCalledWith("tasks");
      expect(mockKnex.where).toHaveBeenCalledWith({ id: 2 });
    });
  });

  describe("delete()", () => {
    it("should be delete a task", async () => {
      mockKnex.where.mockResolvedValueOnce([
        { id: 2, title: "Learn Docker", completed: false },
      ]);

      const taskId = 2;
      await taskService.delete(taskId);

      expect(mockQueryBuilder).toHaveBeenCalledWith("tasks");
      expect(mockKnex.where).toHaveBeenCalledWith({ id: taskId });
    });

    it("should be throw exception when task not found", async () => {
      mockKnex.where.mockResolvedValueOnce([]);

      const taskId = 2;
      await expect(taskService.delete(taskId)).rejects.toThrow(
        "Task not found."
      );

      expect(mockQueryBuilder).toHaveBeenCalledWith("tasks");
      expect(mockKnex.where).toHaveBeenCalledWith({ id: taskId });
    });
  });
});
