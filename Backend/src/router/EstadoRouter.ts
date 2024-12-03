import { NextFunction, Request, Response, Router } from "express";
import { EstadoController } from "../controller";
import { ActualizarEstadoDto, CrearEstadoDto } from "../dto";
import { validateDto } from "../middleware";

const EstadoRouter = Router();

EstadoRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await EstadoController.obtenerEstados(req, res);
    } catch (error) {
      next(error);
    }
  }
);

EstadoRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await EstadoController.obtenerEstado(req, res);
    } catch (error) {
      next(error);
    }
  }
);

EstadoRouter.post(
  "/",
  validateDto(CrearEstadoDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await EstadoController.crearEstado(req, res);
    } catch (error) {
      next(error);
    }
  }
);

EstadoRouter.put(
  "/:id",
  validateDto(ActualizarEstadoDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await EstadoController.actualizarEstado(req, res);
    } catch (error) {
      next(error);
    }
  }
);

EstadoRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await EstadoController.eliminarEstado(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default EstadoRouter;
