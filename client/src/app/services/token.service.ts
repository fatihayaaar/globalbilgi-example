import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {}

  setAccessToken(token: string) {
    localStorage.setItem('token', token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }

  setRole(token: string) {
    const tokenWithoutPrefix = token.replace('Bearer ', '');
    const parts = tokenWithoutPrefix.split('.');
    const decodedPayload = atob(parts[1]);
    const payload = JSON.parse(decodedPayload);
    const role = payload.role;
    const sub = payload.sub;
    this.setUserMail(sub);
    this.setIsAdmin(role);
  }

  setIsAdmin(role: string) {
    if (role.includes('ROLE_ADMIN')) {
      localStorage.setItem('isAdmin', "true");
    } else {
      localStorage.setItem('isAdmin', "false");
    }
  }

  setUserMail(userMail: string) {
    localStorage.setItem('userMail', userMail);
  }

  getUserMail(): string | null {
    return localStorage.getItem("userMail");
  }

  getIsAdmin(): string | null {
    return localStorage.getItem('isAdmin');
  }
}
