import { Request, Response } from "express";
import { taskController } from "./task-controller-factory";

const getTasks = (request: Request, response: Response) =>
  taskController.getTasks(request, response);

const createTasks = (request: Request, response: Response) =>
  taskController.createTasks(request, response);

const updateTask = (request: Request, response: Response) =>
  taskController.updateTask(request, response);

const deleteTask = (request: Request, response: Response) =>
  taskController.deleteTask(request, response);

export { getTasks, createTasks, updateTask, deleteTask };
