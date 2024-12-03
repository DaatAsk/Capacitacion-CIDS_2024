import dataSource from "../db";
import { DesarrolladorXProyectoEntity } from "../entity";
import { DatabaseException } from "../exception";
import { DesarrolladorXProyecto } from "../model";

const _desarrolladorXProyectoRepository = dataSource.getRepository(
  DesarrolladorXProyectoEntity
);

const obtenerRelaciones = async (): Promise<DesarrolladorXProyecto[]> => {
  try {
    return await _desarrolladorXProyectoRepository.find({
      relations: ["desarrollador", "proyecto"],
    });
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const obtenerRelacionPorProyectoId = async (
  proyectoId: number
): Promise<DesarrolladorXProyecto[]> => {
  try {
    return await _desarrolladorXProyectoRepository.find({
      where: { proyecto: { id: proyectoId } },
      relations: ["desarrollador", "proyecto"],
    });
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const obtenerRelacionPorDesarrolladorId = async (
  desarrolladorId: number
): Promise<DesarrolladorXProyecto[]> => {
  try {
    return await _desarrolladorXProyectoRepository.find({
      where: { desarrollador: { id: desarrolladorId } },
      relations: ["desarrollador", "proyecto"],
    });
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const crearRelacion = async (
  proyectoId: number,
  desarrolladorId: number
): Promise<DesarrolladorXProyecto> => {
  try {
    const relacion = _desarrolladorXProyectoRepository.create({
      id_proyecto: proyectoId,
      id_desarrollador: desarrolladorId,
    });
    return await _desarrolladorXProyectoRepository.save(relacion);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const eliminarRelacionPorProyectoId = async (
  proyectoId: number
): Promise<void> => {
  try {
    await _desarrolladorXProyectoRepository.delete({ id_proyecto: proyectoId });
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const eliminarRelacionPorDesarrolladorId = async (
  desarrolladorId: number
): Promise<void> => {
  try {
    await _desarrolladorXProyectoRepository.delete({
      id_desarrollador: desarrolladorId,
    });
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const DesarrolladorXProyectoRepository = {
  obtenerRelaciones,
  obtenerRelacionPorProyectoId,
  obtenerRelacionPorDesarrolladorId,
  crearRelacion,
  eliminarRelacionPorProyectoId,
  eliminarRelacionPorDesarrolladorId,
};
