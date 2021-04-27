import { AccountService } from './../account/account.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { GetDonorRequest } from '../core/models/getDonorRequest';
import { PostDonorRequest } from '../core/models/postDonorRequest';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DonorRequestService {
  currentNotificationSource = new BehaviorSubject<number>(1);
  currentNotification$ = this.currentNotificationSource.asObservable();

  baseUrl = environment.baseUrl;
  header = this.account.authHeader();

  constructor(private http: HttpClient, private account: AccountService) {}

  getDonorRequestForDonor = (donorId: number) => {
    return this.http.get<Array<GetDonorRequest>>(
      `${this.baseUrl}DonorRequest/GetDonorRequests?DonorId=${donorId}`,
      { headers: this.header }
    );
  };

  getDonorRequestById = (DonorRequestId: number) => {
    return this.http.get<GetDonorRequest>(
      `${this.baseUrl}DonorRequest/GetDonorRequestById?DonorRequestId=${DonorRequestId}`,
      { headers: this.header }
    );
  };

  postDonorRequest = (data: PostDonorRequest) => {
    return this.http.post(
      `${this.baseUrl}DonorRequest/PostDonorRequest`,
      data,
      { headers: this.header }
    );
  };

  responseOnDonorRequest = (
    donorRequestId: number,
    donorId: number,
    status: boolean
  ) => {
    return this.http.patch(
      `${this.baseUrl}DonorRequest/AcceptOrDeclain?DonorRequestId=${donorRequestId}&DonorId=${donorId}&Status=${status}`,
      null,
      { headers: this.header }
    );
  };

  isReadDonorRequest = (donorRequestId: number) => {
    return this.http.patch(
      `${this.baseUrl}DonorRequest/UpdateIsRead?DonorRequestId=${donorRequestId}`,
      null,
      { headers: this.header }
    );
  };

  countDonorRequest = (donorRequestId: number) => {
    return this.http
      .get<number>(
        `${this.baseUrl}DonorRequest/CountOfNotRead?DonorId=${donorRequestId}`,
        { headers: this.header }
      )
      .pipe(
        map((res) => {
          this.currentNotificationSource.next(res);
          return res;
        })
      );
  };

  getSendRequestList = (
    donorId: number,
    pageNumber: number,
    pageSize: number
  ) => {
    return this.http.get(
      `${this.baseUrl}DonorRequest/GetDonorSendRequests?DonorId=${donorId}&pageNumber=${pageNumber}&PageSize=${pageSize}`,
      { headers: this.header }
    );
  };
}
