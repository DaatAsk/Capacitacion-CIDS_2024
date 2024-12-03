import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class CrearTareaDto {
  @IsNotEmpty({ message: "El titulo es requerido." })
  @IsString({ message: "El título de la tarea debe ser un texto." })
  titulo: string;

  @IsNotEmpty({ message: "La tarea es requerido." })
  @IsString({ message: "La descripción de la tarea debe ser un texto." })
  descripcion: string;

  @IsNotEmpty({ message: "La fecha limite es requerido." })
  @IsDateString(
    {},
    { message: "La fecha límite debe ser un formato de fecha válido." }
  )
  fechaLimite: Date;

  @IsNotEmpty({ message: "El estado es requerido." })
  @IsInt({ message: "El estado debe ser un identificador válido." })
  estado: number;

  @IsNotEmpty({ message: "Eñ proyecto es requerido." })
  @IsInt({ message: "El proyecto debe ser un identificador válido." })
  idProyecto?: number;

  @IsOptional()
  @IsInt({ message: "El asignado debe ser un identificador válido." })
  idAsignado?: number;
}
