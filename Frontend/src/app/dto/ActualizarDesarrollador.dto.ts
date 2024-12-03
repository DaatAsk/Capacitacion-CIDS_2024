import { Desarrollador } from "../model";

export type ActualizarDesarrolladorDto = Pick<Desarrollador, 'nombre' | 'correo' | 'rol' |'fechaContratacion'>;
