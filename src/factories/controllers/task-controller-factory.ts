import { TaskController } from "../../controllers/task-controller";
import { taskService } from "../services/task-service-factory";

export const taskController = new TaskController(taskService);
