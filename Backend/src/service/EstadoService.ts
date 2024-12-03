import { NotFoundException } from "../exception";
import { Estado } from "../model";
import { CrearEstadoDto, ActualizarEstadoDto } from "../dto";
import { EstadoRepository } from "../repository/EstadoRepository";

const obtenerEstados = (): Promise<Estado[]> => {
  try {
    return EstadoRepository.obtenerEstados();
  } catch (error: any) {
    throw error;
  }
};

const obtenerEstado = async (id: number): Promise<Estado> => {
  try {
    const estado = await EstadoRepository.obtenerEstado(id);
    if (!estado) {
      throw new NotFoundException(`Estado con id ${id} no encontrado.`);
    }
    return estado;
  } catch (error: any) {
    throw error;
  }
};

const crearEstado = (payload: CrearEstadoDto): Promise<Estado> => {
  try {
    return EstadoRepository.crearEstado(payload);
  } catch (error: any) {
    throw error;
  }
};

const actualizarEstado = async (
  id: number,
  payload: ActualizarEstadoDto
): Promise<Estado> => {
  try {
    const estado = await EstadoRepository.obtenerEstado(id);
    if (!estado) {
      throw new NotFoundException(`Estado con id ${id} no encontrado.`);
    }
    return EstadoRepository.actualizarEstado(id, payload);
  } catch (error: any) {
    throw error;
  }
};

const eliminarEstado = async (id: number): Promise<void> => {
  try {
    const estado = await EstadoRepository.obtenerEstado(id);
    if (!estado) {
      throw new NotFoundException(`Estado con id ${id} no encontrado.`);
    }
    return EstadoRepository.eliminarEstado(id);
  } catch (error: any) {
    throw error;
  }
};

export const EstadoService = {
  obtenerEstados,
  obtenerEstado,
  crearEstado,
  actualizarEstado,
  eliminarEstado,
};
