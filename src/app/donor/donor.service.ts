import { AccountService } from 'src/app/account/account.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { UpdateDonor } from '../core/models/updateDonor';
import { ThisReceiver } from '@angular/compiler';

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

  updateDonor = (donor: UpdateDonor) => {
    return this.http.post(`${this.baseUrl}Donor/PostDonorInfo`, donor, {
      headers: this.header,
    });
  };

  locationUpdate = (donorId: number, longitude: number, latitude: number) => {
    return this.http.put(
      `${this.baseUrl}Donor/UpdateLocation?donorId=${donorId}&Longitude=${longitude}&Latitude=${latitude}`,
      null,
      { headers: this.header }
    );
  };
}
