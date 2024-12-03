import { Rol } from "./Rol.model";

export interface Desarrollador {
  id: number;
  nombre: string;
  correo: string;
  rol: Rol;
  fechaContratacion: Date;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  // proyectosResponsable: Proyecto[];
  // proyectos: Proyecto[];
  // tareas: Tarea[];
}
