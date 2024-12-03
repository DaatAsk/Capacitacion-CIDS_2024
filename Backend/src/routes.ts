import { Ruta } from "./model";
import { DesarrolladorRouter, EstadoRouter, ProyectoRouter, RolRouter, TareaRouter } from "./router";
import DesarrolladorXProyectoRouter from "./router/DesarrolladorxProyectoRouter";

export const ROUTES: Ruta[] = [
  {
    path: "/desarrolladores",
    router: DesarrolladorRouter,
  },
  {
    path: "/roles",
    router: RolRouter,
  },
  {
    path: "/proyectos",
    router: ProyectoRouter,
  },
  {
    path: "/tareas",
    router: TareaRouter,
  },
  {
    path: "/estados",
    router: EstadoRouter,
  },
  {
    path: "/desarrolladorxproyecto",
    router: DesarrolladorXProyectoRouter,
  },
];
