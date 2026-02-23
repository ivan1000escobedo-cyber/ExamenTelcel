import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post('http://localhost:7575/api/v1/cliente/login', //'http://localhost:7575/api/v1/cliente/login'
      { usuario: this.usuario, password: this.password },
      { withCredentials: true }  // ✅ importante para la sesión
    ).subscribe({
      next: () => {
        localStorage.setItem('usuario', this.usuario);
        this.router.navigate(['']);
      },
      error: () => this.error = 'Usuario o contraseña incorrectos'
    });
  }

}
