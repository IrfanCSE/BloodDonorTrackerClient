import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { UpdateDonor } from '../core/models/updateDonor';

@Injectable({
  providedIn: 'root',
})
export class DonorService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getDonor = (user: string) => {
    return this.http.get<UpdateDonor>(`${this.baseUrl}Donor/GetDonorById?userId=${user}`);
  };

  updateDonor = (donor: UpdateDonor) => {
    return this.http.post(`${this.baseUrl}/api/Donor/PostDonorInfo`, donor);
  };

  locationUpdate = (donorId: number, longitude: number, latitude: number) => {
    return this.http.put(
      `${this.baseUrl}Donor/UpdateLocation?donorId=${donorId}&Longitude=${longitude}&Latitude=${latitude}`,
      null
    );
  };
}
