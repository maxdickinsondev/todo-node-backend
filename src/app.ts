import express from "express";
import { limiter } from "./middlewares/rate-limit";
import { bodyParser } from "./middlewares/json";
import { routes } from "./routes";
import { error } from "./middlewares/error";

const app = express();

app.use(limiter);
app.use(bodyParser);
app.use(routes);
app.use(error);

export default app;
