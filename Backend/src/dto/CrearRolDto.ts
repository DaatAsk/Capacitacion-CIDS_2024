import { IsString } from "class-validator";

export class CrearRolDto {
  @IsString({ message: "El nombre del rol debe ser un texto." })
  nombre: string;
}
