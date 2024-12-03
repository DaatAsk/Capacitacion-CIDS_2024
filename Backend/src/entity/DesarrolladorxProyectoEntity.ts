import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { DesarrolladorEntity } from "./DesarrolladorEntity";
import { ProyectoEntity } from "./ProyectoEntity";

@Entity({ name: "desarrollador_x_proyecto" })
export class DesarrolladorXProyectoEntity {
  @PrimaryColumn()
  id_proyecto: number;

  @PrimaryColumn()
  id_desarrollador: number;

  @ManyToOne(() => ProyectoEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_proyecto" })
  proyecto: ProyectoEntity;

  @ManyToOne(() => DesarrolladorEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_desarrollador" })
  desarrollador: DesarrolladorEntity;
}
