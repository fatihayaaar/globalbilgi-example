import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserData } from '../../components/models/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  searchUser(firstname: string, surname: string, firstname2: string, surname2: string): Observable<UserData[]> {
    return this.http.post<UserData[]>('http://localhost:8080/api/user/search', {
      "firstname": firstname,
      "surname": surname,
      "firstname2": firstname2,
      "surname2": surname2,
    });
  }
}
