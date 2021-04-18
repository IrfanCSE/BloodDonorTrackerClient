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
      `${this.baseUrl}Blood/GetAvailableDonorLanding?userId=${userId}&pageNumber=${pageNo}&PageSize=${pageSize}`
    );
  };

  getBloddRequests = (userId: string, pageNumber: number, pageSize: number) => {
    return this.http.get<Pagination<GetBloodRequest>>(
      `${this.baseUrl}Blood/GetAvailableBloodReqeustLanding?userId=${userId}&pageNumber=${pageNumber}&PageSize=${pageSize}`
    );
  };

  getBloodRequestsByUser = (
    userId: string,
    pageNumber: number,
    pageSize: number
  ) => {
    return this.http.get<Pagination<GetBloodRequest>>(
      `${this.baseUrl}Blood/GetBloodRequestByUserLanding?userId=${userId}&pageNumber=${pageNumber}&PageSize=${pageSize}`
    );
  };

  getBloodResponsedByUser = (
    userId: string,
    pageNumber: number,
    pageSize: number
  ) => {
    return this.http.get<Pagination<GetBloodRequest>>(
      `${this.baseUrl}Blood/GetBloodResponsedByUserLanding?userId=${userId}&pageNumber=${pageNumber}&PageSize=${pageSize}`
    );
  };

  getBloodRequestById = (requestId: number) => {
    return this.http
      .get<GetBloodRequest>(`${this.baseUrl}Blood/GetBloodRequstById?BloodRequstId=${requestId}`);
  };

  postBloodRequest = (request: PostBloodRequest) => {
    console.log(request);
    return this.http.post(`${this.baseUrl}Blood/PostBloodRequest`, request);
  };

  RemoveBloodRequest = (requestId: number) => {
    return this.http.patch(
      `${this.baseUrl}Blood/RemoveBloodRequest?BloodRequest=${requestId}`,
      null
    );
  };

  ResponsedOnBloodRequest = (BloodRequestId: number, donorId: number) => {
    return this.http.patch(
      `${this.baseUrl}Blood/ResponseOnBloodRequest?BloodRequestIdPk=${BloodRequestId}&ResponseDonorId=${donorId}`,
      null
    );
  };

  CancelResponsedOnBloodRequest = (BloodRequestId: number, donorId: number) => {
    return this.http
      .get(`${this.baseUrl}Blood/CancelResponseOnBloodRequest?BloodRequestIdPk=${BloodRequestId}&ResponseDonorId=${donorId}
    `);
  };

  RemoveResponsedOnBloodRequest = (requestId: number) => {
    return this.http
      .get(`${this.baseUrl}Blood/RemoveResponseOnBloodRequest?BloodRequestIdPk=${requestId}
    `);
  };
}
