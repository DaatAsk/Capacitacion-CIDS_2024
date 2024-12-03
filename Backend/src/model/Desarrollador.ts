import { Proyecto } from "./Proyecto";
import { Rol } from "./Rol";
import { Tarea } from "./Tarea";

export interface Desarrollador {
  id: number;
  nombre: string;
  correo: string;
  rol: Rol;
  fechaContratacion: Date;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  proyectosResponsable: Proyecto[];
  proyectos: Proyecto[];
  tareas: Tarea[];
}
 