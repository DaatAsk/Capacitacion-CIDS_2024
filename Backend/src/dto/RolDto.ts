import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class RolDto {
  @IsNotEmpty({ message: "El id es obligatorio." })
  @IsInt({ message: "El id debe ser un número entero." })
  id: number;

  @IsNotEmpty({ message: "El nombre es obligatorio." })
  @IsString({ message: "El nombre debe ser un texto." })
  nombre: string;
}
