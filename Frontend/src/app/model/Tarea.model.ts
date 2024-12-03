import { Desarrollador } from "./Desarrollador.model";
import { Estado } from "./Estado.model";
import { Proyecto } from "./Proyecto.model";

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  estado: Estado;
  proyecto: Proyecto | null;
  asignado: Desarrollador | null;
  fechaLimite: Date;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}
