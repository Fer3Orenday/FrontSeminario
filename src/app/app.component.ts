import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showNavBar = true;

  constructor(private router: Router) {
    // Escuchar los cambios de navegación para mostrar/ocultar el NavBar
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Mostrar el NavBar solo si no estamos en la ruta de login
        if (event.url === '/login' || event.url === '/registro'){
          this.showNavBar = false;
        } else {
          this.showNavBar = true;
        }
      }
    });
  }
}
