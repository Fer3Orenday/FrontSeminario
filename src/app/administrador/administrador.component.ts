import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegistrosService } from '../services/registros.service';
import { HttpClient } from '@angular/common/http';

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

  deleteUser(user: any) {
    console.log("Usuario a eliminar:", user); // Verificar que user tiene el formato correcto
    if (user && user._id) { // Asegurarse de que user no es undefined y tiene _id
      const userId = user._id;
      console.log("ID del usuario a eliminar:", userId);
      this.userService.deleteUser(userId).subscribe(
        response => {
          console.log(response.message); // Mostrar mensaje de éxito en la consola
          // Eliminar el usuario de la lista local sin recargar toda la lista
          this.users = this.users.filter(u => u._id !== userId);
        },
        error => {
          console.error('Error al eliminar usuario:', error);
        }
      );
    } else {
      console.error("Error: El usuario no tiene un ID válido.");
    }
  }
  



}
