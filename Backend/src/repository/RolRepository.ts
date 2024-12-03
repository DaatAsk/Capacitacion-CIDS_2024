import dataSource from "../db";
import { RolEntity } from "../entity";
import { DatabaseException } from "../exception";
import { Rol } from "../model";
import { CrearRolDto, ActualizarRolDto } from "../dto";

const _rolRepository = dataSource.getRepository(RolEntity);

const obtenerRoles = async (): Promise<Rol[]> => {
  try {
    return await _rolRepository.find();
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const obtenerRol = async (id: number): Promise<Rol | null> => {
  try {
    return await _rolRepository.findOne({ where: { id } });
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const crearRol = (payload: CrearRolDto): Promise<Rol> => {
  try {
    const rol: Omit<Rol, "id"> = {
      ...payload,
    };

    return _rolRepository.save(rol);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const actualizarRol = async (
  id: number,
  payload: ActualizarRolDto
): Promise<Rol> => {
  try {
    await _rolRepository.update(id, { ...payload });

    return obtenerRol(id) as Promise<Rol>;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const eliminarRol = async (id: number): Promise<void> => {
  try {
    await _rolRepository.delete(id);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const RolRepository = {
  obtenerRoles,
  obtenerRol,
  crearRol,
  actualizarRol,
  eliminarRol,
};
