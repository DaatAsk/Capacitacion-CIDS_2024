import { NotFoundException } from "../exception";
import { DesarrolladorXProyecto } from "../model";
import { DesarrolladorXProyectoRepository } from "../repository";

const obtenerRelaciones = (): Promise<DesarrolladorXProyecto[]> => {
  try {
    return DesarrolladorXProyectoRepository.obtenerRelaciones();
  } catch (error: any) {
    throw error;
  }
};

const obtenerRelacionPorProyectoId = async (
  proyectoId: number
): Promise<DesarrolladorXProyecto[]> => {
  try {
    const relaciones =
      await DesarrolladorXProyectoRepository.obtenerRelacionPorProyectoId(
        proyectoId
      );

    if (!relaciones.length) {
      throw new NotFoundException(
        `Relación con proyectoId ${proyectoId} no encontrada.`
      );
    }

    return relaciones;
  } catch (error: any) {
    throw error;
  }
};

const obtenerRelacionPorDesarrolladorId = async (
  desarrolladorId: number
): Promise<DesarrolladorXProyecto[]> => {
  try {
    const relaciones =
      await DesarrolladorXProyectoRepository.obtenerRelacionPorDesarrolladorId(
        desarrolladorId
      );

    if (!relaciones.length) {
      throw new NotFoundException(
        `Relación con desarrolladorId ${desarrolladorId} no encontrada.`
      );
    }

    return relaciones;
  } catch (error: any) {
    throw error;
  }
};

const crearRelacion = (
  proyectoId: number,
  desarrolladorId: number
): Promise<DesarrolladorXProyecto> => {
  try {
    return DesarrolladorXProyectoRepository.crearRelacion(
      proyectoId,
      desarrolladorId
    );
  } catch (error: any) {
    throw error;
  }
};

const eliminarRelacionPorProyectoId = async (
  proyectoId: number
): Promise<void> => {
  try {
    const relaciones =
      await DesarrolladorXProyectoRepository.obtenerRelacionPorProyectoId(
        proyectoId
      );

    if (!relaciones.length) {
      throw new NotFoundException(
        `Relación con proyectoId ${proyectoId} no encontrada.`
      );
    }

    return DesarrolladorXProyectoRepository.eliminarRelacionPorProyectoId(
      proyectoId
    );
  } catch (error: any) {
    throw error;
  }
};

const eliminarRelacionPorDesarrolladorId = async (
  desarrolladorId: number
): Promise<void> => {
  try {
    const relaciones =
      await DesarrolladorXProyectoRepository.obtenerRelacionPorDesarrolladorId(
        desarrolladorId
      );

    if (!relaciones.length) {
      throw new NotFoundException(
        `Relación con desarrolladorId ${desarrolladorId} no encontrada.`
      );
    }

    return DesarrolladorXProyectoRepository.eliminarRelacionPorDesarrolladorId(
      desarrolladorId
    );
  } catch (error: any) {
    throw error;
  }
};

export const DesarrolladorXProyectoService = {
  obtenerRelaciones,
  obtenerRelacionPorProyectoId,
  obtenerRelacionPorDesarrolladorId,
  crearRelacion,
  eliminarRelacionPorProyectoId,
  eliminarRelacionPorDesarrolladorId,
};
