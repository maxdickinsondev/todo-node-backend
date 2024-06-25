import "dotenv/config";
import { Knex } from "knex";
import env from "./src/constants/env";

export default {
  client: "mysql",
  connection: {
    host: env.MYSQL_DB_HOST,
    port: env.MYSQL_DB_DOCKER_PORT,
    user: env.MYSQL_DB_USER,
    password: env.MYSQL_DB_PASS,
    database: env.MYSQL_DB_NAME,
  },

  migrations: {
    directory: "./src/database/migrations",
  },
} as Knex.Config;
