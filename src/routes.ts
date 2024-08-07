import { Router } from "express";
import { validator } from "./middlewares/validator";
import { createTaskSchema } from "./validators/create-task";
import { updateTaskSchema } from "./validators/update-task";
import { deleteTaskSchema } from "./validators/delete-task";
import {
  createTasks,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "./factories/controllers";

const routes = Router();

routes.get("/tasks", getTasks);

routes.get("/tasks/:id", getTaskById);

routes.post("/tasks", validator(createTaskSchema), createTasks);

routes.put("/tasks/:id", validator(updateTaskSchema), updateTask);

routes.delete("/tasks/:id", validator(deleteTaskSchema), deleteTask);

export { routes };
