import dataSource from "../db";
import { DesarrolladorEntity, ProyectoEntity } from "../entity";
import { DatabaseException } from "../exception";
import { Desarrollador } from "../model";
import { ActualizarDesarrolladorDto, CrearDesarrolladorDto } from "../dto";
import { DesarrolladorXProyectoRepository, ProyectoRepository, RolRepository } from "../repository"; 

const _desarrolladorRepository = dataSource.getRepository(DesarrolladorEntity);
const _proyectoRepository = dataSource.getRepository(ProyectoEntity);

const obtenerDesarrolladores = async (): Promise<Desarrollador[]> => {
  try {
    return await _desarrolladorRepository.find({
      relations: {
        rol: true,
        proyectosResponsable: true,
        proyectos: true,
        tareas: true,
      },
    });
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const obtenerDesarrollador = async (
  id: number
): Promise<Desarrollador | null> => {
  try {
    return await _desarrolladorRepository.findOne({
      where: { id },
      relations: {
        rol: true,
        proyectosResponsable: true,
        proyectos: true,
        tareas: true,
      },
    });
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const crearDesarrollador = async (
  payload: CrearDesarrolladorDto
): Promise<Desarrollador> => {
  try {
    const rol = await RolRepository.obtenerRol(payload.rol.id);
    if (!rol) {
      throw new DatabaseException(
        `Rol con id ${payload.rol.id} no encontrado.`
      );
    }

    const desarrollador: Omit<
      Desarrollador,
      "id" | "proyectosResponsable" | "proyectos" | "tareas"
    > = {
      ...payload,
      fechaContratacion: new Date(payload.fechaContratacion),
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };

    return _desarrolladorRepository.save(desarrollador);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const actualizarDesarrollador = async (
  id: number,
  payload: ActualizarDesarrolladorDto
): Promise<Desarrollador> => {
  try {
    const rol = await RolRepository.obtenerRol(payload.rol.id);
    if (!rol) {
      throw new DatabaseException(`Rol con id ${payload.rol.id} no encontrado.`);
    }

    const desarrollador: Pick<
      Desarrollador,
      "nombre" | "correo" | "rol" | "fechaContratacion" | "fechaActualizacion"
    > = {
      ...payload,
      fechaActualizacion: new Date(),
    };

    await _desarrolladorRepository.update(id, desarrollador);

    return obtenerDesarrollador(id) as Promise<Desarrollador>;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const eliminarDesarrollador = async (id: number): Promise<void> => {
  try {
    const proyectos = await _proyectoRepository.find({where: { responsable: {id}}})

    for (const proyecto of proyectos) {
      proyecto.responsable = null as DesarrolladorEntity | null;
      await _proyectoRepository.save(proyecto);
    }
    
    await DesarrolladorXProyectoRepository.eliminarRelacionPorDesarrolladorId(id)

    await _desarrolladorRepository.delete(id);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const obtenerDesarrolladoresPorIds = async (
  ids: number[]
): Promise<Desarrollador[]> => {
  try {
    return await _desarrolladorRepository.findByIds(ids);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const DesarrolladorRepository = {
  obtenerDesarrolladores,
  obtenerDesarrollador,
  crearDesarrollador,
  actualizarDesarrollador,
  eliminarDesarrollador,
  obtenerDesarrolladoresPorIds
};
