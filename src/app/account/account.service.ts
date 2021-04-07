import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserReg } from '../core/models/userReg';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  registerUser = (user: UserReg) => {
    return this.http.post(`${this.baseUrl}Identity/RegisterUser`, user);
  };

  login = (email: string, password: string) => {
    return this.http.get(`${this.baseUrl}Identity/Login?email=${email}&password=${password}`);
  };
}
