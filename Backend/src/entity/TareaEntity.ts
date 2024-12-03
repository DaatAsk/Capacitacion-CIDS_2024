import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Tarea } from "../model";
import { DesarrolladorEntity } from "./DesarrolladorEntity";
import { EstadoEntity } from "./EstadoEntity";
import { ProyectoEntity } from "./ProyectoEntity";

@Entity({ name: "tareas" })
export class TareaEntity implements Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @ManyToOne(() => EstadoEntity, (estado) => estado.tarea)
  @JoinColumn({ name: "id_estado" })
  estado: EstadoEntity;

  @ManyToOne(() => ProyectoEntity, (proyecto) => proyecto.tareas)
  @JoinColumn({ name: "id_proyecto" })
  proyecto: ProyectoEntity | null;

  @ManyToOne(() => DesarrolladorEntity, (desarrollador) => desarrollador.tareas)
  @JoinColumn({ name: "id_asignado" })
  asignado: DesarrolladorEntity | null;

  @Column()
  fechaLimite: Date;

  @Column()
  fechaCreacion: Date;

  @Column()
  fechaActualizacion: Date;
}
