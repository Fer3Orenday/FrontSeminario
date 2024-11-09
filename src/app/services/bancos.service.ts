import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BancosService {
  private apiUrl = 'http://localhost:3000/api/';  // La URL de tu API

  constructor(private http: HttpClient) { }

  getBancos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'bancos');
  }

  // Método para registrar un usuario
  createBancos(banco: { nombre: string, interes: string, anio: number, enganche: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'bancos', banco);
  }

  editBancos(id: string, banco: { nombre: string, interes: string, anio: number, enganche: string }): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'bancos/' + id, banco);
  }
}
