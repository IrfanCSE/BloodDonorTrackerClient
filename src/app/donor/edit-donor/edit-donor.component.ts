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
  donorId: number;
  donor: UpdateDonor;
  location = { longitude: 0, latitude: 0 };
  constructor(
    private account: AccountService,
    private service: DonorService,
    private router: Router,
    private fb: FormBuilder,
    private notify: ToastrService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    this.setCurrentLocation();
  }

  donorForm = this.fb.group({
    name: [''],
    nid: [''],
    phone: [''],
    address: [''],
  });

  setDefaultValue = () => {
    this.donorForm.patchValue({
      name: this.donor?.name,
      nid: this.donor?.nid,
      phone: this.donor?.phone,
      address: this.donor?.address,
    });
  };

  getCurrentUser = () => {
    this.user$ = this.account.currentUser$;
    this.user$.subscribe((res) => {
      this.userId = res.userId;
      this.getDonorInfo(this.userId);
    });
  };

  getDonorInfo = (userId: string) => {
    this.service.getDonor(userId).subscribe((res) => {
      this.donor = res;
      this.donor.userIdFk = userId;
      this.donorId = res.donorIdPk;
      this.setDefaultValue();
    });
  };

  setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        if (pos) {
          this.location.longitude = pos.coords.longitude;
          this.location.latitude = pos.coords.latitude;
        }
      });
    }
  };

  updateLocation = () => {
    this.service
      .locationUpdate(
        this.donorId,
        this.location.longitude,
        this.location.latitude
      )
      .subscribe();
  };

  OnSubmit = () => {
    this.donor = this.donorForm.value;
    this.donor.userIdFk = this.userId;
    this.updateLocation();
    this.service.updateDonor(this.donor).subscribe((res: any) => {
      this.notify.success(res?.message);
      this.router.navigateByUrl('/donor');
    });
  };
}
