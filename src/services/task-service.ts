import { Knex } from "knex";
import { Task } from "../models/task";
import { AppError } from "../errors/error";
import { pagination } from "../metadata/pagination/pagination";
import { IPagination } from "../metadata/pagination/types";

class TaskService {
  constructor(private readonly connection: Knex) {}

  async find(query: IPagination) {
    const count = await this.connection("tasks").count("* as count");
    const paginate = pagination(query, count[0].count);
    const tasks: Task[] = await this.connection<Task>("tasks")
      .offset(paginate.offset)
      .limit(paginate.per_page)
      .select("*");
    return {
      data: tasks,
      pagination: paginate,
    };
  }

  async findById(id: number) {
    const tasks: Task[] = await this.connection<Task>("tasks")
      .where({ id })
      .select("*");
    return tasks;
  }

  async create({ title }: Task) {
    const taskId: number = await this.connection<Task>("tasks")
      .insert({
        title,
        completed: false,
      })
      .then((rows) => rows[0]);
    const task: Task = await this.connection<Task>("tasks")
      .where({ id: taskId })
      .select("*")
      .then((rows) => rows[0]);
    return task;
  }

  async update({ id, title, completed }: Task) {
    const find: Task = await this.connection<Task>("tasks")
      .where({ id })
      .then((rows) => rows[0]);

    if (!find) {
      throw new AppError("Task not found.", 404);
    }

    await this.connection<Task>("tasks").where({ id }).update({
      title,
      completed,
    });

    const task: Task = await this.connection<Task>("tasks")
      .where({ id })
      .select("*")
      .then((rows) => rows[0]);
    return task;
  }

  async delete(id: number) {
    const task: Task = await this.connection<Task>("tasks")
      .where({ id })
      .then((rows) => rows[0]);

    if (!task) {
      throw new AppError("Task not found.", 404);
    }

    await this.connection("tasks").where({ id }).del();
  }
}

export { TaskService };
