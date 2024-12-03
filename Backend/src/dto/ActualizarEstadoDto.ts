import { IsOptional, IsString } from "class-validator";

export class ActualizarEstadoDto {
  @IsOptional()
  @IsString({ message: "El nombre del estado debe ser un texto." })
  nombre: string;
}
