import { TareaRepository } from "../repository";
import { NotFoundException } from "../exception";
import { Tarea } from "../model";
import { CrearTareaDto, ActualizarTareaDto } from "../dto";

const obtenerTareas = (): Promise<Tarea[]> => {
  try {
    return TareaRepository.obtenerTareas();
  } catch (error: any) {
    throw error;
  }
};

const obtenerTarea = async (id: number): Promise<Tarea> => {
  try {
    const tarea = await TareaRepository.obtenerTarea(id);
    if (!tarea) {
      throw new NotFoundException(`Tarea con id ${id} no encontrada.`);
    }
    return tarea;
  } catch (error: any) {
    throw error;
  }
};

const crearTarea = (payload: CrearTareaDto): Promise<Tarea> => {
  try {
    return TareaRepository.crearTarea(payload);
  } catch (error: any) {
    throw error;
  }
};

const actualizarTarea = async (
  id: number,
  payload: ActualizarTareaDto
): Promise<Tarea> => {
  try {
    const tarea = await TareaRepository.obtenerTarea(id);
    if (!tarea) {
      throw new NotFoundException(`Tarea con id ${id} no encontrada.`);
    }
    return TareaRepository.actualizarTarea(id, payload);
  } catch (error: any) {
    throw error;
  }
};

const eliminarTarea = async (id: number): Promise<void> => {
  try {
    const tarea = await TareaRepository.obtenerTarea(id);
    if (!tarea) {
      throw new NotFoundException(`Tarea con id ${id} no encontrada.`);
    }
    return TareaRepository.eliminarTarea(id);
  } catch (error: any) {
    throw error;
  }
};

export const TareaService = {
  obtenerTareas,
  obtenerTarea,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
};
