import { Desarrollador } from "./Desarrollador.model";
import { Tarea } from "./Tarea.model";

export interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  responsable: Desarrollador;
  desarrolladores: Desarrollador[];
  tareas: Tarea[];
}
