import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/';  // La URL de tu API

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'users');
  }

  // Método para registrar un usuario
  registerUser(user: { name: string, email: string, password: string, type: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'users', user);
  }

  loginUser(user: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login', user);
  }

  // Método para eliminar un usuario
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + 'users/' +userId);
  }
}
