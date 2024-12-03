import { NextFunction, Request, Response, Router } from "express";

import { DesarrolladorController } from "../controller";
import { ActualizarDesarrolladorDto, CrearDesarrolladorDto } from "../dto";
import { validateDto } from "../middleware";

const DesarrolladorRouter = Router();

DesarrolladorRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await DesarrolladorController.obtenerDesarrolladores(req, res);
  } catch (error) {
    next(error);
  }
});

DesarrolladorRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await DesarrolladorController.obtenerDesarrollador(req, res);
  } catch (error) {
    next(error);
  }
});

DesarrolladorRouter.post(
  "/",
  validateDto(CrearDesarrolladorDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await DesarrolladorController.crearDesarrollador(req, res);
    } catch (error) {
      next(error);
    }
  }
);

DesarrolladorRouter.put(
  "/:id",
  validateDto(ActualizarDesarrolladorDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await DesarrolladorController.actualizarDesarrollador(req, res);
    } catch (error) {
      next(error);
    }
  }
);

DesarrolladorRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await DesarrolladorController.eliminarDesarrollador(req, res);
  } catch (error) {
    next(error);
  }
});

export default DesarrolladorRouter;
