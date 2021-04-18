import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { User } from 'src/app/core/models/user';
import { PostRequest } from 'src/app/core/models/postRequest';
import { BloodService } from '../blood.service';
import { DonorService } from 'src/app/donor/donor.service';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from 'src/app/core/map/map.component';
import { PointMapComponent } from 'src/app/core/map/point-map/point-map.component';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss'],
})
export class CreateRequestComponent implements OnInit {
  user$: Observable<User> = new Observable<User>();
  userId: string;
  requestId: number;
  request: PostRequest;
  location = { longitude: 0, latitude: 0 };
  time = { hour: 12, minute: 0 };
  meridian = true;
  bloodGroups: any;
  donorId: any;

  constructor(
    private account: AccountService,
    private service: BloodService,
    private router: Router,
    private fb: FormBuilder,
    private notify: ToastrService,
    private route: ActivatedRoute,
    private donor: DonorService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.requestId = this.route.snapshot?.params['id']
      ? this.route.snapshot?.params['id']
      : 0;
    this.getBloodGroup();
    this.getCurrentUser();
    this.getRequest();
  }

  requestForm = this.fb.group({
    bloodRequestIdPk: [0],
    requestDonorFk: [''],
    bloodGroupFK: [''],
    donationDate: [''],
    time: [{ hour: 12, minute: 0 }],
    condition: [''],
    address: [''],
    longitude: [''],
    latitude: [''],
  });

  getBloodGroup = () => {
    this.donor.getBloodGroups().subscribe((res) => (this.bloodGroups = res));
  };

  getDonorInfo = (userId: string) => {
    this.donor.getDonor(userId).subscribe((res) => {
      // this.donor = res;
      // this.donor.userIdFk = userId;
      this.donorId = res.donorIdPk;
      // this.setDefaultValue();
    });
  };

  setDefaultValue = () => {
    this.requestForm.patchValue({
      bloodRequestIdPk: this.request?.bloodRequestIdPk,
      requestDonorFk: this.request?.requestDonorFk,
      bloodGroupFK: this.request?.bloodGroupFK,
      donationDate: this.request?.donationDate,
      time: this.request?.time,
      condition: this.request?.condition,
      address: this.request?.address,
      longitude: this.request?.longitude,
      latitude: this.request?.latitude,
    });
  };

  getCurrentUser = () => {
    this.user$ = this.account.currentUser$;
    this.user$.subscribe((res) => {
      this.userId = res.userId;
      this.getDonorInfo(this.userId);
    });
  };

  getRequest = () => {
    this.service.getBloodRequestById(this.requestId).subscribe((res) => {
      let getTime = new Date(res.time);
      let time = { hour: getTime.getHours(), minute: getTime.getMinutes() };

      this.request = res;
      this.request.time = time;

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

  setLocation = () => {
    this.setCurrentLocation();
    this.dialog
      .open(PointMapComponent, { data: this.location })
      .afterClosed()
      .subscribe((res) => {
        this.location.latitude = res.latitude;
        this.location.longitude = res.longitude;
      });
  };

  updateRequest = () => {};

  OnSubmit = () => {
    let data = this.requestForm.value;
    data.time = `${data.time.hour}:${data.time.minute}`;
    data.bloodRequestIdPk = this.request?.bloodRequestIdPk;
    data.requestDonorFk = this.donorId;

    data.longitude = this.location.longitude;
    data.latitude = this.location.latitude;

    this.service
      .postBloodRequest(this.requestForm.value)
      .subscribe((res: any) => this.notify.success(res?.message));
  };
}
