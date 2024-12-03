import { Request, Response } from "express";
import { TareaService } from "../service";
import { CrearTareaDto, ActualizarTareaDto } from "../dto";

const obtenerTareas = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const tareas = await TareaService.obtenerTareas();
    return res.json(tareas);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ message: errorMessage });
  }
};

const obtenerTarea = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const tarea = await TareaService.obtenerTarea(Number(id));
    return res.json(tarea);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return res.status(404).json({ message: errorMessage });
  }
};

const crearTarea = async (req: Request, res: Response): Promise<Response> => {
  try {
    const payload: CrearTareaDto = req.body;
    const tarea = await TareaService.crearTarea(payload);
    return res.status(201).json(tarea);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ message: errorMessage });
  }
};

const actualizarTarea = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const payload: ActualizarTareaDto = req.body;
    const tarea = await TareaService.actualizarTarea(Number(id), payload);
    return res.json(tarea);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return res.status(404).json({ message: errorMessage });
  }
};

const eliminarTarea = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    await TareaService.eliminarTarea(Number(id));
    return res.status(204).json();
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return res.status(404).json({ message: errorMessage });
  }
};

export const TareaController = {
  obtenerTareas,
  obtenerTarea,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
};
