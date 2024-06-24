import { Request, Response } from "express";
import { TaskService } from "../services/task-service";

class TaskController {
  constructor(private readonly taskService: TaskService) {}

  async getTasks(request: Request, response: Response) {
    const tasks = await this.taskService.find();
    return response.status(200).json({ tasks });
  }

  async createTasks(request: Request, response: Response) {
    const { title } = request.body;
    const task = await this.taskService.create({ title });
    return response.status(201).json({ task });
  }

  async updateTask(request: Request, response: Response) {
    const { title, completed } = request.body;
    const { id } = request.params;
    const task = await this.taskService.update({
      id: Number(id),
      title,
      completed,
    });
    return response.status(201).json({ task });
  }

  async deleteTask(request: Request, response: Response) {
    const { id } = request.params;
    await this.taskService.delete(Number(id));
    return response.status(201).json({ status: 201, message: "success" });
  }
}

export { TaskController };
