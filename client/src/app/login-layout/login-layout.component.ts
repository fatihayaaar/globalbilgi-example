import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service/auth-service.service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.css'
})
export class LoginLayoutComponent {
  username: string = "";
  password: string = "";

  constructor(private service: AuthService) {}

  login(username: string, password: string) {
    this.service.login(username, password);
  }

}
