import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  private apiUrl = 'http://localhost:3000/api/';  // La URL de tu API

  constructor(private http: HttpClient) { }

  getRegistro(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'registros');
  }

  // Método para registrar un usuario
  registro(registro: { user: string, type: string, amount: number, institution: string, years: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'registros', registro);
  }

  getBancos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'bancos');
}

  // Método para eliminar un registro
  deleteRegistrosByEmail(email: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + 'registros/' + email);  
  }
}
