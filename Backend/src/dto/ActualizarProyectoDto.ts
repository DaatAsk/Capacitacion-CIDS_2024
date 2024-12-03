import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  IsNotEmpty,
} from "class-validator";
import { Desarrollador } from "../model";

export class ActualizarProyectoDto {
  @IsNotEmpty({ message: "El nombre es requerido." })
  @IsString({ message: "El nombre del proyecto debe ser un texto." })
  nombre: string;

  @IsNotEmpty({ message: "La descripcion es requerida." })
  @IsString({ message: "La descripción del proyecto debe ser un texto." })
  descripcion: string;

  @IsNotEmpty({ message: "La fecha de inicio es requerida." })
  @IsDateString(
    {},
    { message: "La fecha de inicio debe ser un formato de fecha válido." }
  )
  fechaInicio: Date;

  @IsNotEmpty({ message: "La fecha de finalizacion es requerida." })
  @IsDateString(
    {},
    { message: "La fecha de fin debe ser un formato de fecha válido." }
  )
  fechaFin: Date;

  @IsNotEmpty({ message: "El responsable es requerido." })
  responsable: Desarrollador

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty({
    message: "La lista de desarrolladores no puede estar vacía.",
  })
  @ArrayMinSize(1, { message: "Debe haber al menos un desarrollador." })
 
  desarrolladores: Desarrollador[];
}
