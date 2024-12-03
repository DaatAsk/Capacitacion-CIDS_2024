import { Request, Response } from "express";
import { EstadoService } from "../service";
import { CrearEstadoDto, ActualizarEstadoDto } from "../dto";

const obtenerEstados = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const estados = await EstadoService.obtenerEstados();
    return res.json(estados);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ message: errorMessage });
  }
};

const obtenerEstado = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const estado = await EstadoService.obtenerEstado(Number(id));
    return res.json(estado);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return res.status(404).json({ message: errorMessage });
  }
};

const crearEstado = async (req: Request, res: Response): Promise<Response> => {
  try {
    const payload: CrearEstadoDto = req.body;
    const estado = await EstadoService.crearEstado(payload);
    return res.status(201).json(estado);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ message: errorMessage });
  }
};

const actualizarEstado = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const payload: ActualizarEstadoDto = req.body;
    const estado = await EstadoService.actualizarEstado(Number(id), payload);
    return res.json(estado);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return res.status(404).json({ message: errorMessage });
  }
};

const eliminarEstado = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    await EstadoService.eliminarEstado(Number(id));
    return res.status(204).json();
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return res.status(404).json({ message: errorMessage });
  }
};

export const EstadoController = {
  obtenerEstados,
  obtenerEstado,
  crearEstado,
  actualizarEstado,
  eliminarEstado,
};
