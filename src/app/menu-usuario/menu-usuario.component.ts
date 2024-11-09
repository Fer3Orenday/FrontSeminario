import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrl: './menu-usuario.component.css'
})
export class MenuUsuarioComponent {

  constructor(private router: Router) {}

  navigateToCotizacion() {
    this.router.navigate(['/calculadora']);
  }

}
