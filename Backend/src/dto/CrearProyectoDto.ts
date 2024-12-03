import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
} from "class-validator";
import { Desarrollador } from "../model";

export class CrearProyectoDto {
  @IsNotEmpty({ message: "El nombre del proyecto es obligatorio." })
  @IsString({ message: "El nombre del proyecto debe ser un texto." })
  nombre: string;

  @IsNotEmpty({ message: "La descripción del proyecto es obligatoria." })
  @IsString({ message: "La descripción del proyecto debe ser un texto." })
  descripcion: string;

  @IsNotEmpty({ message: "La fecha de inicio es obligatoria." })
  @IsDateString(
    {},
    { message: "La fecha de inicio debe ser un formato de fecha válido." }
  )
  fechaInicio: string;

  @IsNotEmpty({ message: "La fecha de fin es obligatoria." })
  @IsDateString(
    {},
    { message: "La fecha de fin debe ser un formato de fecha válido." }
  )
  fechaFin: string;

  @IsNotEmpty({ message: "El id del responsable es obligatorio." })
  responsable: Desarrollador

  @IsOptional()
  @IsArray()
  desarrolladores: Desarrollador[] | null;
}
