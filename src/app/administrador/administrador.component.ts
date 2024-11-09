import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegistrosService } from '../services/registros.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BancosService } from '../services/bancos.service';

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
  bancoForm!: FormGroup;
  bancos: any[] = [];
  _id: any;

  constructor(
    private userService: AuthService,
    private registrosService: RegistrosService,
    private fb: FormBuilder,
    private bancosService: BancosService
  ) {
    let userExist = localStorage.getItem('user');
    this.user = userExist ? JSON.parse(userExist) : '';
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRegistros();

    this.bancoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      interes: ['', [Validators.required]],
      anio: ['', [Validators.required]],  // Se mantiene el campo como texto para que acepte varios años
      enganche: ['', [Validators.required]]
    });

    this.loadBancos();
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
        // Filtrar los registros para excluir el usuario logueado
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

  onSubmit(): void {
    if (this.bancoForm.valid) {
      const formValue = this.bancoForm.value;
      // Convertir 'anio' en un arreglo de números (si es necesario)
      formValue.anio = formValue.anio.split(',').map((year: string) => Number(year.trim()));

      if (this._id) {
        // Si el formulario tiene un ID, actualizar el banco (editar)
        this.bancosService.editBancos(this._id, formValue).subscribe(
          (response) => {
            // Después de la actualización, recargar la lista de bancos
            this.loadBancos();
            this.bancoForm.reset();
          },
          (error) => {
            console.error('Error al actualizar el banco:', error);
          }
        );
      } else {
        // Si no hay ID, se considera un registro nuevo
        this.bancosService.createBancos(formValue).subscribe(
          (response) => {
            // Recargar la lista de bancos y resetear el formulario
            this.loadBancos();
            this.bancoForm.reset();
          },
          (error) => {
            console.error('Error al registrar el banco:', error);
          }
        );
      }
    }
  }

  loadBancos(): void {
    this.bancosService.getBancos().subscribe(
      (bancos) => {
        this.bancos = bancos;
      },
      (error) => {
        console.error('Error al cargar los bancos:', error);
      }
    );
  }

  editBanco(banco: any): void {
    // Rellenar el formulario con los valores del banco seleccionado
    this.bancoForm.patchValue({
      nombre: banco.nombre,
      interes: banco.interes,
      anio: banco.anio.join(', '),  // Convertir el arreglo de años a una cadena separada por comas
      enganche: banco.enganche
    });

    // Añadir el ID del banco al formulario para actualizarlo
    this._id = banco._id;
  }
}
