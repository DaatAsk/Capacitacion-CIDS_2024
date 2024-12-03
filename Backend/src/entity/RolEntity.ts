import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Rol } from "../model";
import { DesarrolladorEntity } from "./DesarrolladorEntity";

@Entity({ name: "roles" })
export class RolEntity implements Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => DesarrolladorEntity, (desarrollador) => desarrollador.rol)
  desarrollador: DesarrolladorEntity[];
}
