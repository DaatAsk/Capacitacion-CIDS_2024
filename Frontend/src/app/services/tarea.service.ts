import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Tarea } from '../model';
import { ActualizarTareaDto, CrearTareaDto } from '../dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private API_URL = 'http://localhost:3000/tareas';

  private http = inject(HttpClient);

  obtenerTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.API_URL);
  }

  obtenerTarea(id: number): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.API_URL}/${id}`);
  }

  crearTarea(payload: CrearTareaDto): Observable<Tarea> {
    return this.http.post<Tarea>(this.API_URL, payload);
  }

  actualizarTarea(
    id: number,
    payload: ActualizarTareaDto
  ): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.API_URL}/${id}`, payload);
  }

  eliminarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  constructor() {}
}
