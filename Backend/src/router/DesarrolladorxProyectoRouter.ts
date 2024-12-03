import { NextFunction, Request, Response, Router } from "express";
import { DesarrolladorXProyectoController } from "../controller";

const DesarrolladorXProyectoRouter = Router();

DesarrolladorXProyectoRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await DesarrolladorXProyectoController.obtenerRelaciones(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default DesarrolladorXProyectoRouter