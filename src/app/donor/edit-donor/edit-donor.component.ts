import { ToastrService } from 'ngx-toastr';
import { DonorService } from './../donor.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { UpdateDonor } from 'src/app/core/models/updateDonor';
import { User } from 'src/app/core/models/user';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-donor',
  templateUrl: './edit-donor.component.html',
  styleUrls: ['./edit-donor.component.scss'],
})
export class EditDonorComponent implements OnInit {
  user$: Observable<User> = new Observable<User>();
  userId: string;
  donorName: string;
  // donorId: number;
  donor: UpdateDonor;
  location = { longitude: 0, latitude: 0 };
  newForm: boolean = true;
  isMapAuto: boolean = true;

  constructor(
    private account: AccountService,
    private service: DonorService,
    private router: Router,
    private fb: FormBuilder,
    private notify: ToastrService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    // this.setCurrentLocation();
  }

  donorForm = this.fb.group({
    name: [''],
    nid: [''],
    phone: [''],
    address: [''],
  });

  setDefaultValue = () => {
    this.donorForm.patchValue({
      name: this.donorName,
      nid: this.donor?.nid,
      phone: this.donor?.phone,
      address: this.donor?.address,
    });

    this.location.latitude = this.donor?.latitude;
    this.location.longitude = this.donor?.longitude;
    this.newForm = false;
    this.isMapAuto = this.donor?.isLocationUpdateAuto;
  };

  getCurrentUser = () => {
    this.user$ = this.account.currentUser$;
    this.user$.subscribe((res) => {
      this.userId = res.userId;
      this.donorName = `${res.firstName} ${res.lastName}`;
      this.getDonorInfo(this.userId);
    });
  };

  getDonorInfo = (userId: string) => {
    this.service.getDonor(userId).subscribe((res) => {
      this.donor = res;
      this.donor.userIdFk = userId;
      this.setDefaultValue();
    });
  };

  setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        if (pos) {
          this.location.longitude = pos.coords.longitude;
          this.location.latitude = pos.coords.latitude;
          this.updateLocation();
        }
      });
    }
  };

  updateLocation = () => {
    this.service
      .locationUpdate(
        this.userId,
        this.location.longitude,
        this.location.latitude
      )
      .subscribe();
  };

  OnSubmit = () => {
    this.donor = this.donorForm.value;
    this.donor.userIdFk = this.userId;

    console.log(this.isMapAuto);
    if (this.isMapAuto) {
      this.setCurrentLocation();
    }

    this.service.updateDonor(this.donor).subscribe((res: any) => {
      if (this.newForm && this.isMapAuto) {
        this.setCurrentLocation();
      }

      this.notify.success(res?.message);
      this.router.navigateByUrl('/donor');
    });
  };
}
