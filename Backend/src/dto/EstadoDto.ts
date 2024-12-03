import { IsString } from "class-validator";

export class EstadoDto {
  @IsString({ message: "El nombre del estado debe ser un texto." })
  nombre: string;
}
