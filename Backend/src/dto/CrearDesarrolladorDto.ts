import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { RolDto } from "./RolDto";


export class CrearDesarrolladorDto {
  @IsNotEmpty({ message: "El nombre es obligatorio." })
  @IsString({ message: "El nombre debe ser un texto." })
  nombre: string;

  @IsNotEmpty({ message: "El correo es obligatorio." })
  @IsEmail({}, { message: "El correo debe ser un formato de correo válido." })
  correo: string;

  @IsNotEmpty({ message: "El rol es obligatorio." })
  @ValidateNested()
  rol: RolDto;

  @IsNotEmpty({ message: "La fecha de contratación es obligatoria." })
  @IsDateString({}, { message: "La fecha de contratación debe ser un formato de fecha válido." })
  fechaContratacion: string;
}
