import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private router: Router, private location: Location) { }

  goToLogin(): void {
    // Eliminar el usuario de localStorage
    localStorage.removeItem('user');
    // Redirigir al login
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.location.back();  // Regresa a la página anterior
  }
}
