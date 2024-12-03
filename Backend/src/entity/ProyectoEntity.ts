import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Proyecto } from "../model";
import { DesarrolladorEntity } from "./DesarrolladorEntity";
import { TareaEntity } from "./TareaEntity";

@Entity({ name: "proyectos" })
export class ProyectoEntity implements Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;

  @ManyToOne(
    () => DesarrolladorEntity,
    (desarrollador) => desarrollador.proyectosResponsable,
    {nullable: true}
  )
  @JoinColumn({ name: "id_responsable" })
  responsable: DesarrolladorEntity | null;

  @Column()
  fechaCreacion: Date;

  @Column()
  fechaActualizacion: Date;

  @ManyToMany(
    () => DesarrolladorEntity,
    (desarrollador) => desarrollador.proyectos
  )
  @JoinTable({
    name: "desarrollador_x_proyecto",
    joinColumn: {
      name: "id_proyecto",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "id_desarrollador",
      referencedColumnName: "id",
    },
  })
  desarrolladores: DesarrolladorEntity[];

  @OneToMany(() => TareaEntity, (tarea) => tarea.proyecto)
  tareas: TareaEntity[];
}
