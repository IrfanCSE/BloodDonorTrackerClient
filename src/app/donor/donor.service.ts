import { AccountService } from 'src/app/account/account.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { UpdateDonor } from '../core/models/updateDonor';
import { Report } from '../core/models/report';
import { CommonDDL } from '../core/models/commonDDL';
@Injectable({
  providedIn: 'root',
})
export class DonorService {
  baseUrl = environment.baseUrl;
  header = this.account.authHeader();

  constructor(private http: HttpClient, private account: AccountService) {}

  getDonor = (user: string) => {
    return this.http.get<UpdateDonor>(
      `${this.baseUrl}Donor/GetDonorById?userId=${user}`,
      { headers: this.header }
    );
  };

  getReport = (userId: number) => {
    return this.http.get<Report>(
      `${this.baseUrl}HealthReport/GetHealthReportById?donorId=${userId}`,
      { headers: this.header }
    );
  };

  getBloodGroups = () => {
    return this.http.get<CommonDDL>(
      `${this.baseUrl}HealthReport/GetBloodGroups`,
      { headers: this.header }
    );
  };

  updateDonor = (donor: UpdateDonor) => {
    return this.http.post(`${this.baseUrl}Donor/PostDonorInfo`, donor, {
      headers: this.header,
    });
  };

  updateReport = (report: Report) => {
    return this.http.post(
      `${this.baseUrl}HealthReport/PostHealthReport`,
      report,
      { headers: this.header }
    );
  };

  updateMapMode = (donorId: number, status: boolean) => {
    return this.http.put(
      `${this.baseUrl}Donor/UpdateMapMode?DonorId=${donorId}&Status=${status}`,
      null,
      { headers: this.header }
    );
  };

  locationUpdate = (userId: string, longitude: number, latitude: number) => {
    return this.http.put(
      `${this.baseUrl}Donor/UpdateLocation?userId=${userId}&Longitude=${longitude}&Latitude=${latitude}`,
      null,
      { headers: this.header }
    );
  };
}
