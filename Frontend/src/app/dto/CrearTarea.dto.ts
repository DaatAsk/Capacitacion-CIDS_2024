import { Tarea } from "../model";

export type CrearTareaDto = Pick<
  Tarea,
  'titulo' | 'descripcion' | 'fechaLimite' | 'estado' | 'proyecto' | 'asignado'
>;
