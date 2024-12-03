import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../model';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private API_URL = 'http://localhost:3000/estados';

  private http = inject(HttpClient);

  obtenerEstado(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.API_URL);
  }
}
