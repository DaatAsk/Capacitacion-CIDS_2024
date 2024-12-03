import { Proyecto } from "../model";

export type ActualizarProyectoDto = Pick<Proyecto, 'nombre' | 'descripcion' | 'fechaInicio' | 'fechaFin' | 'responsable' | 'desarrolladores' >
