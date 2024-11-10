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
      lastName: ['', Validators.required],
      middleName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rfc: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      registerDate: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      type: ['', Validators.required]  // Asegúrate de que el campo se llama 'type'
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
