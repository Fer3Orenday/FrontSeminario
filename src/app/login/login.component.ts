import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
      this.authService.loginUser(user).subscribe({
        next: (response) => {
          localStorage.setItem('user', JSON.stringify(response.user));
          if (response.user.type === 'user') {
            this.router.navigate(['/calculadora']);
          } else {
            this.router.navigate(['/administrador']);
          }
        },
        error: (error) => {
          this.errorMessage = error.error.message;  // Mostrar el mensaje de error
        }
      });
    }
  }

  onRegister() {
    this.router.navigate(['/registro']);
  }
}
