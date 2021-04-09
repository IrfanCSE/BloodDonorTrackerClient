import { User } from './../core/models/user';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserReg } from '../core/models/userReg';
import { of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.baseUrl;

  currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  loadCurrentUser = (token: any): any => {
    console.log('token: ' + token);
    if (token === null) {
      this.currentUserSource.next();
      return of(null);
    }

    let header = new HttpHeaders();
    header = header.set('Authorization', `Bearer ${token}`);

    return this.http
      .get<User>(this.baseUrl + 'Identity/GetCurrentUser', { headers: header })
      .pipe(
        map((user: User) => {
          if (user !== null) {
            localStorage.setItem('token', user?.token);
            this.currentUserSource.next(user);
          }
          return user;
        })
      );
  };

  registerUser = (user: UserReg) => {
    return this.http.post(`${this.baseUrl}Identity/RegisterUser`, user);
  };

  login = (login: any) => {
    return this.http
      .get<User>(
        `${this.baseUrl}Identity/Login?email=${login.email}&password=${login.password}`
      )
      .pipe(
        map((user: User) => {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);

          return user;
        })
      );
  };
}
