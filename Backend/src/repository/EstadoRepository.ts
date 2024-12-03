import dataSource from "../db";
import { EstadoEntity } from "../entity";
import { DatabaseException } from "../exception";
import { Estado } from "../model";
import { CrearEstadoDto, ActualizarEstadoDto } from "../dto";

const _estadoRepository = dataSource.getRepository(EstadoEntity);

const obtenerEstados = async (): Promise<Estado[]> => {
  try {
    return await _estadoRepository.find();
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const obtenerEstado = async (id: number): Promise<Estado | null> => {
  try {
    return await _estadoRepository.findOne({ where: { id } });
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const obtenerEstadoPorNombre = async (
  nombre: string
): Promise<Estado | null> => {
  try {
    return await _estadoRepository.findOne({ where: { nombre } });
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const crearEstado = async (payload: CrearEstadoDto): Promise<Estado> => {
  try {
    const estado: Omit<Estado, "id"> = {
      ...payload,
    };

    return _estadoRepository.save(estado);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const actualizarEstado = async (
  id: number,
  payload: ActualizarEstadoDto
): Promise<Estado> => {
  try {
    await _estadoRepository.update(id, { ...payload });

    return obtenerEstado(id) as Promise<Estado>;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

const eliminarEstado = async (id: number): Promise<void> => {
  try {
    await _estadoRepository.delete(id);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const EstadoRepository = {
  obtenerEstados,
  obtenerEstado,
  obtenerEstadoPorNombre,
  crearEstado,
  actualizarEstado,
  eliminarEstado,
};
