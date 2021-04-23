import { PostBloodRequest } from './../core/models/postBloodRequest';
import { map } from 'rxjs/operators';
import { AccountService } from './../account/account.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GetBloodDonors } from '../core/models/getBloodDonors';
import { Pagination } from '../core/models/pagination';
import { GetBloodRequest } from '../core/models/getBloodRequest';

@Injectable({
  providedIn: 'root',
})
export class BloodService {
  baseUrl = environment.baseUrl;
  header = this.account.authHeader();

  constructor(private http: HttpClient, private account: AccountService) {}

  getDonors = (userId: string, pageNo: number, pageSize: number) => {
    return this.http.get<Pagination<GetBloodDonors>>(
      `${this.baseUrl}Blood/GetAvailableDonorLanding?userId=${userId}&pageNumber=${pageNo}&PageSize=${pageSize}`,
      { headers: this.header }
    );
  };

  getBloddRequests = (userId: string, pageNumber: number, pageSize: number) => {
    return this.http.get<Pagination<GetBloodRequest>>(
      `${this.baseUrl}Blood/GetAvailableBloodReqeustLanding?userId=${userId}&pageNumber=${pageNumber}&PageSize=${pageSize}`,
      { headers: this.header }
    );
  };

  getMyBloddRequests = (donorId: number) => {
    return this.http.get<Array<GetBloodRequest>>(
      `${this.baseUrl}Blood/GetMyBloodRequest?donorId=${donorId}`,
      { headers: this.header }
    );
  };

  getBloodRequestsByUser = (
    userId: string,
    pageNumber: number,
    pageSize: number
  ) => {
    return this.http.get<Pagination<GetBloodRequest>>(
      `${this.baseUrl}Blood/GetBloodRequestByUserLanding?userId=${userId}&pageNumber=${pageNumber}&PageSize=${pageSize}`,
      { headers: this.header }
    );
  };

  getBloodResponsedByUser = (
    userId: string,
    pageNumber: number,
    pageSize: number
  ) => {
    return this.http.get<Pagination<GetBloodRequest>>(
      `${this.baseUrl}Blood/GetBloodResponsedByUserLanding?userId=${userId}&pageNumber=${pageNumber}&PageSize=${pageSize}`,
      { headers: this.header }
    );
  };

  getBloodRequestById = (requestId: number) => {
    return this.http.get<GetBloodRequest>(
      `${this.baseUrl}Blood/GetBloodRequstById?BloodRequstId=${requestId}`,
      { headers: this.header }
    );
  };

  postBloodRequest = (request: PostBloodRequest) => {
    console.log(request);
    return this.http.post(`${this.baseUrl}Blood/PostBloodRequest`, request, {
      headers: this.header,
    });
  };

  RemoveBloodRequest = (requestId: number) => {
    return this.http.patch(
      `${this.baseUrl}Blood/RemoveBloodRequest?BloodRequest=${requestId}`,
      null,
      { headers: this.header }
    );
  };

  ResponsedOnBloodRequest = (BloodRequestId: number, donorId: number) => {
    return this.http.patch(
      `${this.baseUrl}Blood/ResponseOnBloodRequest?BloodRequestIdPk=${BloodRequestId}&ResponseDonorId=${donorId}`,
      null,
      { headers: this.header }
    );
  };

  CancelResponsedOnBloodRequest = (BloodRequestId: number, donorId: number) => {
    return this.http.patch(
      `${this.baseUrl}Blood/CancelResponseOnBloodRequest?BloodRequestIdPk=${BloodRequestId}&ResponseDonorId=${donorId}
    `,
      null,
      { headers: this.header }
    );
  };

  RemoveResponsedOnBloodRequest = (requestId: number) => {
    return this.http.patch(
      `${this.baseUrl}Blood/RemoveResponseOnBloodRequest?BloodRequestIdPk=${requestId}`,
      null,
      { headers: this.header }
    );
  };
}
