import { Request, Response } from "express";
import { ProyectoService } from "../service";
import { CrearProyectoDto, ActualizarProyectoDto } from "../dto";

const obtenerProyectos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const proyectos = await ProyectoService.obtenerProyectos();
    return res.json(proyectos);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ message: errorMessage });
  }
};

const obtenerProyecto = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const proyecto = await ProyectoService.obtenerProyecto(Number(id));
    return res.json(proyecto);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return res.status(404).json({ message: errorMessage });
  }
};

const crearProyecto = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const payload: CrearProyectoDto = req.body;
    const proyecto = await ProyectoService.crearProyecto(payload);
    return res.status(201).json(proyecto);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ message: errorMessage });
  }
};

const actualizarProyecto = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const payload: ActualizarProyectoDto = req.body;
    const proyecto = await ProyectoService.actualizarProyecto(
      Number(id),
      payload
    );
    return res.json(proyecto);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return res.status(404).json({ message: errorMessage });
  }
};

const eliminarProyecto = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    await ProyectoService.eliminarProyecto(Number(id));
    return res.status(204).json();
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return res.status(404).json({ message: errorMessage });
  }
};

export const ProyectoController = {
  obtenerProyectos,
  obtenerProyecto,
  crearProyecto,
  actualizarProyecto,
  eliminarProyecto,
};
