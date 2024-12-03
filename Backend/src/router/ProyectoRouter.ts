import { NextFunction, Request, Response, Router } from "express";
import { ProyectoController } from "../controller";
import { ActualizarProyectoDto, CrearProyectoDto } from "../dto";
import { validateDto } from "../middleware";

const ProyectoRouter = Router();

ProyectoRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ProyectoController.obtenerProyectos(req, res);
    } catch (error) {
      next(error);
    }
  }
);

ProyectoRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ProyectoController.obtenerProyecto(req, res);
    } catch (error) {
      next(error);
    }
  }
);

ProyectoRouter.post(
  "/",
  validateDto(CrearProyectoDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ProyectoController.crearProyecto(req, res);
    } catch (error) {
      next(error);
    }
  }
);

ProyectoRouter.put(
  "/:id",
  validateDto(ActualizarProyectoDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ProyectoController.actualizarProyecto(req, res);
    } catch (error) {
      next(error);
    }
  }
);

ProyectoRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ProyectoController.eliminarProyecto(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default ProyectoRouter;
