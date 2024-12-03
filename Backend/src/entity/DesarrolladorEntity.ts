import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Desarrollador } from "../model";
import { ProyectoEntity } from "./ProyectoEntity";
import { RolEntity } from "./RolEntity";
import { TareaEntity } from "./TareaEntity";

@Entity({ name: "desarrolladores" })
export class DesarrolladorEntity implements Desarrollador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @ManyToOne(() => RolEntity, (rol) => rol.desarrollador)
  @JoinColumn({ name: "id_rol" })
  rol: RolEntity;

  @Column()
  fechaContratacion: Date;

  @Column()
  fechaCreacion: Date;

  @Column()
  fechaActualizacion: Date;

  @OneToMany(() => ProyectoEntity, (proyecto) => proyecto.responsable)
  proyectosResponsable: ProyectoEntity[];

  @ManyToMany(() => ProyectoEntity, (proyecto) => proyecto.desarrolladores)
  proyectos: ProyectoEntity[];

  @OneToMany(() => TareaEntity, (tarea) => tarea.asignado)
  tareas: TareaEntity[];
}
