import dataSource from "../db";
import { DesarrolladorEntity, ProyectoEntity } from "../entity";
import { DatabaseException, NotFoundException } from "../exception";
import { CrearProyectoDto, ActualizarProyectoDto } from "../dto";
import { DesarrolladorRepository } from "../repository/DesarrolladorRepository";
import { DesarrolladorXProyectoRepository } from "./DesarrolladorXProyectoRepository";
import { DeepPartial } from "typeorm";
import { Proyecto } from "../model";

const _proyectoRepository = dataSource.getRepository(ProyectoEntity);

const obtenerProyectos = async (): Promise<ProyectoEntity[]> => {
  try {
    return await _proyectoRepository.find({
      relations: {
        responsable: true,
        tareas: true,
        desarrolladores: true,
      },
    });
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const obtenerProyecto = async (id: number): Promise<ProyectoEntity | null> => {
  try {
    return await _proyectoRepository.findOne({
      where: { id },
      relations: {
        responsable: true,
        tareas: true,
        desarrolladores: true,
      },
    });
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const crearProyecto = async (
  payload: CrearProyectoDto
): Promise<ProyectoEntity> => {
  try {
    const responsable = await DesarrolladorRepository.obtenerDesarrollador(
      payload.responsable.id
    );

    if (!responsable) {
      throw new NotFoundException(
        `Responsable con id ${payload.responsable.id} no encontrado.`
      );
    }

    const desarrolladores = payload.desarrolladores
      ? await DesarrolladorRepository.obtenerDesarrolladoresPorIds(
          payload.desarrolladores.map((d) => d.id)
        )
      : [];

    const proyecto: DeepPartial<ProyectoEntity> = {
      nombre: payload.nombre,
      descripcion: payload.descripcion,
      fechaInicio: new Date(payload.fechaInicio),
      fechaFin: new Date(payload.fechaFin),
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      responsable: responsable as DesarrolladorEntity, // Cambiado aquí
      desarrolladores: desarrolladores as DesarrolladorEntity[], // Cambiado aquí
    };

    const proyectoCreado = await _proyectoRepository.save(proyecto);

    for (const desarrollador of desarrolladores) {
      await DesarrolladorXProyectoRepository.crearRelacion(
        proyectoCreado.id,
        desarrollador.id
      );
    }
    return proyectoCreado;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const actualizarProyecto = async (
  id: number,
  payload: ActualizarProyectoDto
): Promise<ProyectoEntity> => {
  try {
    const proyectoExistente = await _proyectoRepository.findOne({
      where: { id },
      relations: ["desarrolladores", "responsable"],
    });

    if (!proyectoExistente) {
      throw new NotFoundException(`Proyecto con id ${id} no encontrado.`);
    }

    const responsable = await DesarrolladorRepository.obtenerDesarrollador(
      payload.responsable.id
    );

    if (!responsable) {
      throw new NotFoundException(
        `Responsable con id ${payload.responsable.id} no encontrado.`
      );
    }

    const desarrolladores = payload.desarrolladores
      ? await DesarrolladorRepository.obtenerDesarrolladoresPorIds(
          payload.desarrolladores.map((d) => d.id)
        )
      : [];
    if (desarrolladores.length !== payload.desarrolladores.length) {
      throw new DatabaseException(
        "Uno o más desarrolladores no fueron encontrados."
      );
    }

    proyectoExistente.nombre = payload.nombre;
    proyectoExistente.descripcion = payload.descripcion;
    proyectoExistente.fechaInicio = new Date(payload.fechaInicio);
    proyectoExistente.fechaFin = new Date(payload.fechaFin);
    proyectoExistente.fechaActualizacion = new Date();
    proyectoExistente.responsable = responsable as DesarrolladorEntity; // Cambiado aquí
    proyectoExistente.desarrolladores =
      desarrolladores as DesarrolladorEntity[]; // Cambiado aquí

    await _proyectoRepository.save(proyectoExistente);

    await DesarrolladorXProyectoRepository.eliminarRelacionPorProyectoId(id);

    for (const desarrollador of desarrolladores) {
      await DesarrolladorXProyectoRepository.crearRelacion(
        id,
        desarrollador.id
      );
    }

    return proyectoExistente;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const eliminarProyecto = async (id: number): Promise<void> => {
  try {
    await DesarrolladorXProyectoRepository.eliminarRelacionPorProyectoId(id);
    await _proyectoRepository.delete(id);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const ProyectoRepository = {
  obtenerProyectos,
  obtenerProyecto,
  crearProyecto,
  actualizarProyecto,
  eliminarProyecto,
};
