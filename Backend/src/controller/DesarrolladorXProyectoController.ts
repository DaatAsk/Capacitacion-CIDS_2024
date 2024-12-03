import { Request, Response } from "express";
import { DesarrolladorXProyectoService } from "../service";

const obtenerRelaciones = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const relaciones = await DesarrolladorXProyectoService.obtenerRelaciones();
    return res.json(relaciones);
  } catch (error) {
    throw error;
  }
};

const obtenerRelacionPorProyectoId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { proyectoId } = req.params;
    const relaciones =
      await DesarrolladorXProyectoService.obtenerRelacionPorProyectoId(
        Number(proyectoId)
      );
    return res.json(relaciones);
  } catch (error) {
    throw error;
  }
};

const obtenerRelacionPorDesarrolladorId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { desarrolladorId } = req.params;
    const relaciones =
      await DesarrolladorXProyectoService.obtenerRelacionPorDesarrolladorId(
        Number(desarrolladorId)
      );
    return res.json(relaciones);
  } catch (error) {
    throw error;
  }
};

const crearRelacion = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { proyectoId, desarrolladorId } = req.body;
    const relacion = await DesarrolladorXProyectoService.crearRelacion(
      Number(proyectoId),
      Number(desarrolladorId)
    );
    return res.status(201).json(relacion);
  } catch (error) {
    throw error;
  }
};

const eliminarRelacionPorProyectoId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { proyectoId } = req.params;
    await DesarrolladorXProyectoService.eliminarRelacionPorProyectoId(
      Number(proyectoId)
    );
    return res.status(204).json();
  } catch (error) {
    throw error;
  }
};

const eliminarRelacionPorDesarrolladorId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { desarrolladorId } = req.params;
    await DesarrolladorXProyectoService.eliminarRelacionPorDesarrolladorId(
      Number(desarrolladorId)
    );
    return res.status(204).json();
  } catch (error) {
    throw error;
  }
};

export const DesarrolladorXProyectoController = {
  obtenerRelaciones,
  obtenerRelacionPorProyectoId,
  obtenerRelacionPorDesarrolladorId,
  crearRelacion,
  eliminarRelacionPorProyectoId,
  eliminarRelacionPorDesarrolladorId,
};
