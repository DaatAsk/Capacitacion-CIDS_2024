import { Desarrollador } from "./Desarrollador";
import { Tarea } from "./Tarea";

export interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  responsable: Desarrollador | null;
  desarrolladores: Desarrollador[] | null;
  tareas: Tarea[];
}
