import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Desarrollador } from '../model';
import { ActualizarDesarrolladorDto, CrearDesarrolladorDto } from '../dto';

@Injectable({
  providedIn: 'root',
})
export class DesarrolladorService {
  private API_URL = 'http://localhost:3000/desarrolladores';

  private http = inject(HttpClient);
 
  obtenerDesarrolladores(): Observable<Desarrollador[]> {
    return this.http.get<Desarrollador[]>(this.API_URL);
  }

  obtenerDesarrollador(id: number) {
    return this.http.get<Desarrollador>(`${this.API_URL}/${id}`);
  }

  crearDesarrollador(payload: CrearDesarrolladorDto) {
    return this.http.post<Desarrollador>(this.API_URL, payload);
  }

  actualizarDesarrollador(id: number, payload: ActualizarDesarrolladorDto) {
    return this.http.put<Desarrollador>(`${this.API_URL}/${id}`, payload);
  }

  eliminarDesarrollador(id: number) {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
