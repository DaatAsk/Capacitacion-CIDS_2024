import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActualizarProyectoDto, CrearProyectoDto } from '../dto';
import { Proyecto } from '../model';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private API_URL = 'http://localhost:3000/proyectos';

  private http = inject(HttpClient);

  obtenerProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.API_URL);
  }

  obtenerProyecto(id: number): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${this.API_URL}/${id}`);
  }

  crearProyecto(payload: CrearProyectoDto): Observable<Proyecto> {
    return this.http.post<Proyecto>(this.API_URL, payload);
  }

  actualizarProyecto(
    id: number,
    payload: ActualizarProyectoDto
  ): Observable<Proyecto> {
    return this.http.put<Proyecto>(`${this.API_URL}/${id}`, payload);
  }

  eliminarProyecto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
