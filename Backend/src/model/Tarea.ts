import { Desarrollador } from "./Desarrollador";
import { Estado } from "./Estado";
import { Proyecto } from "./Proyecto";

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
