import { map } from 'rxjs/operators';
import { AccountService } from './../account/account.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GetBloodDonors } from '../core/models/getBloodDonors';
import { Pagination } from '../core/models/pagination';

@Injectable({
  providedIn: 'root',
})
export class BloodService {
  baseUrl = environment.baseUrl;
  header = this.account.authHeader();

  constructor(private http: HttpClient, private account: AccountService) {}

  getDonors = (userId: string, pageNo: number, pageSize: number) => {
    return this.http.get<Pagination<GetBloodDonors>>(
      `${this.baseUrl}Blood/GetLanding?userId=${userId}&pageNumber=${pageNo}&PageSize=${pageSize}`
    );
  };
}
