import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    MessageModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    // Basit validasyon
    if (!this.username || !this.password) {
      this.showError = true;
      this.errorMessage = 'Kullanıcı adı ve şifre gereklidir.';
      return;
    }

    // Basit authentication (gerçek uygulamada API çağrısı yapılır)
    if (this.username === 'admin' && this.password === 'admin123') {
      // Başarılı giriş
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', this.username);
      this.router.navigate(['/dashboard']);
    } else {
      this.showError = true;
      this.errorMessage = 'Kullanıcı adı veya şifre hatalı!';
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }
}

