import { NotFoundException } from "../exception";
import { Proyecto } from "../model";
import { CrearProyectoDto, ActualizarProyectoDto } from "../dto";
import { ProyectoRepository } from "../repository";

const obtenerProyectos = (): Promise<Proyecto[]> => {
  try {
    return ProyectoRepository.obtenerProyectos();
  } catch (error: any) {
    throw error;
  }
};

const obtenerProyecto = async (id: number): Promise<Proyecto> => {
  try {
    const proyecto = await ProyectoRepository.obtenerProyecto(id);
    if (!proyecto) {
      throw new NotFoundException(`Proyecto con id ${id} no encontrado.`);
    }
    return proyecto;
  } catch (error: any) {
    throw error;
  }
};

const crearProyecto = (payload: CrearProyectoDto): Promise<Proyecto> => {
  try {
    return ProyectoRepository.crearProyecto(payload);
  } catch (error: any) {
    throw error;
  }
};

const actualizarProyecto = async (
  id: number,
  payload: ActualizarProyectoDto
): Promise<Proyecto> => {
  try {
    const proyecto = await ProyectoRepository.obtenerProyecto(id);
    if (!proyecto) {
      throw new NotFoundException(`Proyecto con id ${id} no encontrado.`);
    }
    return ProyectoRepository.actualizarProyecto(id, payload);
  } catch (error: any) {
    throw error;
  }
};

const eliminarProyecto = async (id: number): Promise<void> => {
  try {
    const proyecto = await ProyectoRepository.obtenerProyecto(id);
    if (!proyecto) {
      throw new NotFoundException(`Proyecto con id ${id} no encontrado.`);
    }
    return ProyectoRepository.eliminarProyecto(id);
  } catch (error: any) {
    throw error;
  }
};

export const ProyectoService = {
  obtenerProyectos,
  obtenerProyecto,
  crearProyecto,
  actualizarProyecto,
  eliminarProyecto,
};
