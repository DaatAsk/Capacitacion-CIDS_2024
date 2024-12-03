import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, validate, ValidateNested } from "class-validator";
import { RolDto } from "./RolDto";


export class ActualizarDesarrolladorDto {
  @IsNotEmpty({ message: "El nombre es requerido." })
  @IsString({ message: "El nombre debe ser un texto." })
  nombre: string;

  @IsNotEmpty({ message: "El mail es requerido." })
  @IsEmail({}, { message: "El correo debe ser un formato de correo válido." })
  correo: string;

  @IsNotEmpty({ message: "El rol es requerido." })
  @ValidateNested()
  rol: RolDto;

  @IsNotEmpty({ message: "La fecha de contratacion es requerida." })
  @IsDateString(
    {},
    { message: "La fecha de contratación debe ser un formato de fecha válido." }
  )
  fechaContratacion: Date;
}
