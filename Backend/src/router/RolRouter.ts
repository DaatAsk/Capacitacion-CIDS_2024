import { NextFunction, Request, Response, Router } from "express";
import { RolController } from "../controller";
import { ActualizarRolDto, CrearRolDto } from "../dto";
import { validateDto } from "../middleware";

const RolRouter = Router();

RolRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await RolController.obtenerRoles(req, res);
  } catch (error) {
    next(error);
  }
});

RolRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await RolController.obtenerRol(req, res);
    } catch (error) {
      next(error);
    }
  }
);

RolRouter.post(
  "/",
  validateDto(CrearRolDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await RolController.crearRol(req, res);
    } catch (error) {
      next(error);
    }
  }
);

RolRouter.put(
  "/:id",
  validateDto(ActualizarRolDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await RolController.actualizarRol(req, res);
    } catch (error) {
      next(error);
    }
  }
);

RolRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await RolController.eliminarRol(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default RolRouter;
