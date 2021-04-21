import { AccountService } from './../account/account.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { GetDonorRequest } from '../core/models/getDonorRequest';
import { PostDonorRequest } from '../core/models/postDonorRequest';

@Injectable({
  providedIn: 'root',
})
export class DonorRequestService {
  baseUrl = environment.baseUrl;
  header = this.account.authHeader();

  constructor(private http: HttpClient, private account: AccountService) {}

  getDonorRequestForDonor = (donorId: number) => {
    return this.http.get<Array<GetDonorRequest>>(
      `${this.baseUrl}DonorRequest/GetDonorRequests?DonorId=${donorId}`
    );
  };

  getDonorRequestById = (DonorRequestId: number) => {
    return this.http.get<GetDonorRequest>(
      `${this.baseUrl}DonorRequest/GetDonorRequestById?DonorRequestId=${DonorRequestId}`
    );
  };

  postDonorRequest = (data: PostDonorRequest) => {
    return this.http.post(
      `${this.baseUrl}DonorRequest/PostDonorRequest`,
      data
    );
  };

  responseOnDonorRequest = (
    donorRequestId: number,
    donorId: number,
    status: boolean
  ) => {
    return this.http.patch(
      `${this.baseUrl}DonorRequest/AcceptOrDeclain?DonorRequestId=${donorRequestId}&DonorId=${donorId}&Status=${status}`,
      null
    );
  };

  isReadDonorRequest = (donorRequestId: number) => {
    return this.http.patch(
      `${this.baseUrl}DonorRequest/UpdateIsRead?DonorRequestId=${donorRequestId}`,
      null
    );
  };
}
