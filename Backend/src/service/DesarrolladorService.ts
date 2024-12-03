import { ActualizarDesarrolladorDto, CrearDesarrolladorDto } from "../dto";
import { NotFoundException } from "../exception";
import { Desarrollador } from "../model";
import { DesarrolladorRepository } from "../repository";

const obtenerDesarrolladores = (): Promise<Desarrollador[]> => {
  try {
    return DesarrolladorRepository.obtenerDesarrolladores();
  } catch (error: any) {
    throw error;
  }
};

const obtenerDesarrollador = async (id: number): Promise<Desarrollador> => {
  try {
    const desarrollador = await DesarrolladorRepository.obtenerDesarrollador(
      id
    );

    if (!desarrollador) {
      throw new NotFoundException(`Desarrollador con id ${id} no encontrado.`);
    }

    return desarrollador;
  } catch (error: any) {
    throw error;
  }
};

const crearDesarrollador = (
  payload: CrearDesarrolladorDto
): Promise<Desarrollador> => {
  try {
    return DesarrolladorRepository.crearDesarrollador(payload);
  } catch (error: any) {
    throw error;
  }
};

const actualizarDesarrollador = async (
  id: number,
  payload: ActualizarDesarrolladorDto
): Promise<Desarrollador> => {
  try {
    const desarrollador = await DesarrolladorRepository.obtenerDesarrollador(
      id
    );

    if (!desarrollador) {
      throw new NotFoundException(`Desarrollador con id ${id} no encontrado.`);
    }

    return DesarrolladorRepository.actualizarDesarrollador(id, payload);
  } catch (error: any) {
    throw error;
  }
};

const eliminarDesarrollador = async (id: number): Promise<void> => {
  try {
    const desarrollador = await DesarrolladorRepository.obtenerDesarrollador(
      id
    );

    if (!desarrollador) {
      throw new NotFoundException(`Desarrollador con id ${id} no encontrado.`);
    }

    return DesarrolladorRepository.eliminarDesarrollador(id);
  } catch (error: any) {
    throw error;
  }
};

export const DesarrolladorService = {
  obtenerDesarrolladores,
  obtenerDesarrollador,
  crearDesarrollador,
  actualizarDesarrollador,
  eliminarDesarrollador,
};
