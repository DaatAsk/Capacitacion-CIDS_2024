import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../model';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private API_URL = 'http://localhost:3000/roles';

  private http = inject(HttpClient);

  obtenerRoles(): Observable<Rol[]>{
    return this.http.get<Rol[]>(this.API_URL)
  }
}
