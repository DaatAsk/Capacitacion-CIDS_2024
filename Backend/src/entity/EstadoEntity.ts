import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Estado } from "../model";
import { TareaEntity } from "./TareaEntity";

@Entity({ name: "estados" })
export class EstadoEntity implements Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => TareaEntity, (tarea) => tarea.estado)
  tarea: TareaEntity;
}
