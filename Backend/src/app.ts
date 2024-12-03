import express, { json } from "express";

import cors from "cors";

import { handleError, logHttpRequest } from "./middleware";
import { ROUTES } from "./routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use(json());

app.use(logHttpRequest());

ROUTES.forEach(({ path, router }) => {
  app.use(path, router);
});

app.use(handleError);

export default app;
