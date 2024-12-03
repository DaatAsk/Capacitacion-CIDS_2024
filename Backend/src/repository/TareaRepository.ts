import dataSource from "../db";
import {
  TareaEntity,
  ProyectoEntity,
  DesarrolladorEntity,
  EstadoEntity,
} from "../entity";
import { DatabaseException, NotFoundException } from "../exception";
import { CrearTareaDto, ActualizarTareaDto } from "../dto";
import { plainToClass } from "class-transformer";
import { ProyectoRepository } from "../repository";
import { DesarrolladorRepository } from "../repository";
import { EstadoRepository } from "../repository";

const _tareaRepository = dataSource.getRepository(TareaEntity);
const _proyectoRepository = dataSource.getRepository(ProyectoEntity);

const obtenerTareas = async (): Promise<TareaEntity[]> => {
  try {
    const tareas = await _tareaRepository.find({
      relations: {
        estado: true,
        proyecto: true,
        asignado: true,
      },
    });
    return plainToClass(TareaEntity, tareas);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const obtenerTarea = async (id: number): Promise<TareaEntity | null> => {
  try {
    const tarea = await _tareaRepository.findOne({
      where: { id },
      relations: {
        estado: true,
        proyecto: true,
        asignado: true,
      },
    });
    return tarea ? plainToClass(TareaEntity, tarea) : null;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const crearTarea = async (payload: CrearTareaDto): Promise<TareaEntity> => {
  try {
    // Obtener el estado por ID
    const estado = await EstadoRepository.obtenerEstado(payload.estado); 
    if (!estado) {
      throw new NotFoundException(
        `Estado con id ${payload.estado} no encontrado.`
      );
    }

    // Validar proyecto si está presente
    let proyecto: ProyectoEntity | null = null;
    if (payload.idProyecto !== undefined) {
      proyecto = (await ProyectoRepository.obtenerProyecto(
        payload.idProyecto
      )) as ProyectoEntity;
      if (!proyecto) {
        throw new NotFoundException(
          `Proyecto con id ${payload.idProyecto} no encontrado.`
        );
      }
    }

    // Validar desarrollador asignado si está presente
    let asignado: DesarrolladorEntity | null = null;
    if (payload.idAsignado !== undefined) {
      asignado = (await DesarrolladorRepository.obtenerDesarrollador(
        payload.idAsignado
      )) as DesarrolladorEntity;
      if (!asignado) {
        throw new NotFoundException(
          `Asignado con id ${payload.idAsignado} no encontrado.`
        );
      }
    }

    // Crear nueva tarea
    const tarea = new TareaEntity();
    tarea.titulo = payload.titulo;
    tarea.descripcion = payload.descripcion;
    tarea.fechaLimite = new Date(payload.fechaLimite);
    tarea.fechaCreacion = new Date();
    tarea.fechaActualizacion = new Date();
    tarea.proyecto = proyecto || null;
    tarea.asignado = asignado || null;
    tarea.estado = estado as EstadoEntity;

    // Guardar tarea
    const nuevaTarea = await _tareaRepository.save(tarea);

    return plainToClass(TareaEntity, nuevaTarea);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const actualizarTarea = async (
  id: number,
  payload: ActualizarTareaDto
): Promise<TareaEntity> => {
  try {
    // Validar proyecto si está presente
    let proyecto: ProyectoEntity | null = null;
    if (payload.idProyecto !== undefined) {
      proyecto = (await ProyectoRepository.obtenerProyecto(
        payload.idProyecto
      )) as ProyectoEntity;
      if (!proyecto) {
        throw new NotFoundException(
          `Proyecto con id ${payload.idProyecto} no encontrado.`
        );
      }
    }

    // Validar desarrollador asignado si está presente
    let asignado: DesarrolladorEntity | null = null;
    if (payload.idAsignado !== undefined) {
      asignado = (await DesarrolladorRepository.obtenerDesarrollador(
        payload.idAsignado
      )) as DesarrolladorEntity;
      if (!asignado) {
        throw new NotFoundException(
          `Asignado con id ${payload.idAsignado} no encontrado.`
        );
      }
    }

    // Obtener el estado por ID
    const estado = await EstadoRepository.obtenerEstado(payload.estado);
    if (!estado) {
      throw new NotFoundException(
        `Estado con id ${payload.estado} no encontrado.`
      );
    }

    // Obtener la tarea existente
    const tarea = (await _tareaRepository.findOne({
      where: { id },
      relations: ["estado", "proyecto", "asignado"],
    })) as TareaEntity;
    if (!tarea) {
      throw new NotFoundException(`Tarea con id ${id} no encontrada.`);
    }

    // Actualizar la tarea
    tarea.titulo = payload.titulo;
    tarea.descripcion = payload.descripcion;
    tarea.fechaLimite = new Date(payload.fechaLimite);
    tarea.fechaActualizacion = new Date();
    tarea.proyecto = proyecto;
    tarea.asignado = asignado;
    tarea.estado = estado as EstadoEntity;

    // Guardar tarea actualizada
    const tareaActualizada = await _tareaRepository.save(tarea);

    return plainToClass(TareaEntity, tareaActualizada);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const eliminarTarea = async (id: number): Promise<void> => {
  try {
    await _tareaRepository.delete(id);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const TareaRepository = {
  obtenerTareas,
  obtenerTarea,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
};
