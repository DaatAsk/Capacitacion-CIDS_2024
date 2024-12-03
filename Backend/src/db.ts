import { DataSource } from "typeorm";
import SnakeNamingStrategy from "typeorm-naming-strategy";
import {
  DesarrolladorEntity,
  DesarrolladorXProyectoEntity,
  EstadoEntity,
  ProyectoEntity,
  RolEntity,
  TareaEntity,
} from "./entity";
import * as dotenv from "dotenv";
dotenv.config();


const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) ?? 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // Esto puede ser necesario para entornos gestionados
  },
  entities: [
    DesarrolladorEntity,
    RolEntity,
    EstadoEntity,
    TareaEntity,
    ProyectoEntity,
    DesarrolladorXProyectoEntity
  ],
  namingStrategy: new SnakeNamingStrategy(),
});

export default dataSource;
