import { Component } from '@angular/core';
import { AuthService } from './services/auth-service/auth-service.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'global-bilgi-example';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.authService.isLogged = true;
    }
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
