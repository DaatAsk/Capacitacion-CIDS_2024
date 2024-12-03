import { Tarea } from "../model";

export type ActualizarTareaDto = Pick<Tarea, 'titulo' | 'descripcion' | 'fechaLimite' | 'estado' | 'proyecto' | 'asignado'>
