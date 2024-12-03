import { IsOptional, IsString } from "class-validator";

export class ActualizarRolDto {
  @IsOptional()
  @IsString({ message: "El nombre del rol debe ser un texto." })
  nombre: string;
}
