import { Request, Response } from "express";
import { ActualizarDesarrolladorDto, CrearDesarrolladorDto } from "../dto";
import { DesarrolladorService } from "../service";

const obtenerDesarrolladores = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const desarrolladores = await DesarrolladorService.obtenerDesarrolladores();
    return res.json(desarrolladores);
  } catch (error) {
    throw error;
  }
};

const obtenerDesarrollador = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const desarrollador = await DesarrolladorService.obtenerDesarrollador(
      Number(id)
    );
    return res.json(desarrollador);
  } catch (error) {
    throw error;
  }
};

const crearDesarrollador = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const payload: CrearDesarrolladorDto = req.body;
    const desarrollador = await DesarrolladorService.crearDesarrollador(payload);
    return res.status(201).json(desarrollador);
  } catch (error) {
    throw error;
  }
};

const actualizarDesarrollador = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const payload: ActualizarDesarrolladorDto = req.body;
    const desarrollador = await DesarrolladorService.actualizarDesarrollador(
      Number(id),
      payload
    );
    return res.json(desarrollador);
  } catch (error) {
    throw error;
  }
};

const eliminarDesarrollador = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    await DesarrolladorService.eliminarDesarrollador(Number(id));
    return res.status(204).json();
  } catch (error) {
    throw error;
  }
};

export const DesarrolladorController = {
  obtenerDesarrolladores,
  obtenerDesarrollador,
  crearDesarrollador,
  actualizarDesarrollador,
  eliminarDesarrollador,
};
