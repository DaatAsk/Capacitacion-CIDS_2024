import { Request, Response } from "express";
import { RolService } from "../service";
import { CrearRolDto, ActualizarRolDto } from "../dto";

const obtenerRoles = async (req: Request, res: Response): Promise<Response> => {
  try {
    const roles = await RolService.obtenerRoles();
    return res.json(roles);
  } catch (error) {
    throw error;
  }
};

const obtenerRol = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const rol = await RolService.obtenerRol(Number(id));
    return res.json(rol);
  } catch (error) {
    throw error;
  }
};

const crearRol = async (req: Request, res: Response): Promise<Response> => {
  try {
    const payload: CrearRolDto = req.body;
    const rol = await RolService.crearRol(payload);
    return res.status(201).json(rol);
  } catch (error) {
    throw error;
  }
};

const actualizarRol = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const payload: ActualizarRolDto = req.body;
    const rol = await RolService.actualizarRol(Number(id), payload);
    return res.json(rol);
  } catch (error) {
    throw error;
  }
};

const eliminarRol = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    await RolService.eliminarRol(Number(id));
    return res.status(204).json();
  } catch (error) {
    throw error;
  }
};

export const RolController = {
  obtenerRoles,
  obtenerRol,
  crearRol,
  actualizarRol,
  eliminarRol,
};
