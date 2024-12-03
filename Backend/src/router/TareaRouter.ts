import { NextFunction, Request, Response, Router } from "express";
import { TareaController } from "../controller";
import { ActualizarTareaDto, CrearTareaDto } from "../dto";
import { validateDto } from "../middleware";

const TareaRouter = Router();

TareaRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TareaController.obtenerTareas(req, res);
    } catch (error) {
      next(error);
    }
  }
);

TareaRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TareaController.obtenerTarea(req, res);
    } catch (error) {
      next(error);
    }
  }
);

TareaRouter.post(
  "/",
  validateDto(CrearTareaDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TareaController.crearTarea(req, res);
    } catch (error) {
      next(error);
    }
  }
);

TareaRouter.put(
  "/:id",
  validateDto(ActualizarTareaDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TareaController.actualizarTarea(req, res);
    } catch (error) {
      next(error);
    }
  }
);

TareaRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TareaController.eliminarTarea(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default TareaRouter;
