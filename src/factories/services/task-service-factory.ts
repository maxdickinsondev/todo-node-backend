import { connection } from "../../database/connection";
import { TaskService } from "../../services/task-service";

export const taskService = new TaskService(connection);
