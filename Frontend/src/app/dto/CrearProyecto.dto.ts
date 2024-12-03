import { Proyecto } from "../model";

export type CrearProyectoDto = Pick<
  Proyecto,
  | 'nombre'
  | 'descripcion'
  | 'fechaInicio'
  | 'fechaFin'
  | 'responsable'
  | 'desarrolladores'
>;
