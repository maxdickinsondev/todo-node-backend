import "express-async-errors";
import env from "./constants/env";
import app from "./app";

app.listen(env.PORT, () =>
  console.log(`Server is runnig on port ${env.PORT}!`)
);
