import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegistrosService } from '../services/registros.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  users: any[] = [];  // Array para almacenar los usuarios
  errorMessage: string = '';
  user: any;
  registros: any;

  constructor(private userService: AuthService, private registrosService: RegistrosService) {
    let userExist = localStorage.getItem('user');
    this.user = userExist ? JSON.parse(userExist) : '';
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRegistros();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        // Filtrar los usuarios para excluir al usuario logueado
        this.users = data.filter(user => user.email !== this.user.email);
      },
      (error) => {
        this.errorMessage = 'Hubo un error al cargar los usuarios';
        console.error(error);
      }
    );
  }

  loadRegistros(): void {
    this.registrosService.getRegistro().subscribe(
      (data) => {
        // Filtrar los usuarios para excluir al usuario logueado
        this.registros = data.filter(registro => registro.user !== this.user.email);
      },
      (error) => {
        this.errorMessage = 'Hubo un error al cargar los registros';
        console.error(error);
      }
    );
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case 'homeValue':
        return 'Basado en Valor de Vivienda';
      case 'salary':
        return 'Basado en Salario';
    }
    return '';
  }
}
