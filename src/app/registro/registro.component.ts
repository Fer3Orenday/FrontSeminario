import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      type: ['', Validators.required]  // Nuevo campo para tipo de usuario
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const user = this.registerForm.value;

    // Llamamos al servicio para registrar al usuario
    this.authService.registerUser(user).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);  // Redirigir a la página de login
      },
      error: (error) => {
        this.errorMessage = error.error.message;  // Mostrar el mensaje de error
      }
    });
  }
}
