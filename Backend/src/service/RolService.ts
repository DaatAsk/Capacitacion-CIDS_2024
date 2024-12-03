import { RolRepository } from "../repository";
import { NotFoundException } from "../exception";
import { Rol } from "../model";
import { CrearRolDto, ActualizarRolDto } from "../dto";

const obtenerRoles = (): Promise<Rol[]> => {
  try {
    return RolRepository.obtenerRoles();
  } catch (error: any) {
    throw error;
  }
};

const obtenerRol = async (id: number): Promise<Rol> => {
  try {
    const rol = await RolRepository.obtenerRol(id);
    if (!rol) {
      throw new NotFoundException(`Rol con id ${id} no encontrado.`);
    }
    return rol;
  } catch (error: any) {
    throw error;
  }
};

const crearRol = (payload: CrearRolDto): Promise<Rol> => {
  try {
    return RolRepository.crearRol(payload);
  } catch (error: any) {
    throw error;
  }
};

const actualizarRol = async (
  id: number,
  payload: ActualizarRolDto
): Promise<Rol> => {
  try {
    const rol = await RolRepository.obtenerRol(id);
    if (!rol) {
      throw new NotFoundException(`Rol con id ${id} no encontrado.`);
    }
    return RolRepository.actualizarRol(id, payload);
  } catch (error: any) {
    throw error;
  }
};

const eliminarRol = async (id: number): Promise<void> => {
  try {
    const rol = await RolRepository.obtenerRol(id);
    if (!rol) {
      throw new NotFoundException(`Rol con id ${id} no encontrado.`);
    }
    return RolRepository.eliminarRol(id);
  } catch (error: any) {
    throw error;
  }
};

export const RolService = {
  obtenerRoles,
  obtenerRol,
  crearRol,
  actualizarRol,
  eliminarRol,
};
