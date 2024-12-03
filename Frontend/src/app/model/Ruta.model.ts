import { Router } from "express";

export type Ruta = {
  path: string;
  router: Router;
};
