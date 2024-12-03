import {
  IsOptional,
  IsDateString,
  IsString,
  ValidateNested,
  IsInt,
  IsNotEmpty,
} from "class-validator";
import { EstadoDto } from "./EstadoDto";

export class ActualizarTareaDto {
  @IsNotEmpty({ message: "El titulo es requerido es requerido." })
  @IsString({ message: "El título de la tarea debe ser un texto." })
  titulo: string;

  @IsNotEmpty({ message: "La descripcion es requerida." })
  @IsString({ message: "La descripción de la tarea debe ser un texto." })
  descripcion: string;

  @IsNotEmpty({ message: "La fecha limite es requerida." })
  @IsDateString(
    {},
    { message: "La fecha límite debe ser un formato de fecha válido." }
  )
  fechaLimite: Date;

  @IsNotEmpty({ message: "El estado es requerido." })
  @IsInt({ message: "El estado debe ser un identificador válido." })
  estado: number;

  @IsNotEmpty({ message: "El proyecto es requerido." })
  @IsInt({ message: "El proyecto debe ser un identificador válido." })
  idProyecto: number;

  @IsOptional()
  @IsInt({ message: "El asignado debe ser un identificador válido." })
  idAsignado: number;
}
