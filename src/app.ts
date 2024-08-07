import express from "express";
import { limiter } from "./middlewares/rate-limit";
import { bodyParser } from "./middlewares/json";
import { routes } from "./routes";
import { error } from "./middlewares/error";
import { cors } from "./middlewares/cors";

const app = express();

app.use(cors);
app.use(limiter);
app.use(bodyParser);
app.use(routes);
app.use(error);

export default app;
