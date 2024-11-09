import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('user');
    
    if (user) {
      // Si hay un usuario en localStorage, permitir la navegación
      return true;
    } else {
      // Si no hay usuario, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
