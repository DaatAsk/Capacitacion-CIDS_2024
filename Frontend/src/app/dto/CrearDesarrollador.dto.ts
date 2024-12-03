import { Desarrollador } from "../model";

export type CrearDesarrolladorDto = Pick<Desarrollador, 'nombre' | 'correo' | 'rol' |'fechaContratacion'>
