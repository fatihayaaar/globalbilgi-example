import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged: boolean = false;
  fullname: string = "";

  constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) { }

  login(mail: string, password: string) {
    console.log(mail + password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post<any>('http://localhost:8080/login', {
      "mail": mail,
      "password": password,
    }, httpOptions).subscribe(
      response => {
        console.log(response);

        const accessToken = response.token;
        if (accessToken) {
          const token = accessToken.replace('Bearer ', '');
          this.tokenService.setAccessToken(token);
          this.isLogged = true;
          this.tokenService.setRole(accessToken);
          console.log(this.tokenService.getIsAdmin());
          this.router.navigate(['/home-page']);
        } else {
          console.error('Access token not found in response headers');
        }
      },
      error => {
        this.isLogged = false;
        console.error('Error: ', error);
      }
    );
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }
}
