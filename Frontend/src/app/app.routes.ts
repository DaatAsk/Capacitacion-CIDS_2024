import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListadoProyectosComponent } from './components/listado-proyectos/listado-proyectos.component';
import { ListadoDesarrolladoresComponent } from './components/listado-desarrolladores/listado-desarrolladores.component';
import { ListadoTareasComponent } from './components/listado-tareas/listado-tareas.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'proyectos', component: ListadoProyectosComponent },
  { path: 'desarrolladores', component: ListadoDesarrolladoresComponent },
  { path: 'tareas', component: ListadoTareasComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
