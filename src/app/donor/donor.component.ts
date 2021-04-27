import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../core/models/user';
import { DonorService } from './donor.service';
import { UpdateDonor } from '../core/models/updateDonor';
import { MatDialog } from '@angular/material/dialog';
import { PointMapComponent } from '../core/map/point-map/point-map.component';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.scss'],
})
export class DonorComponent implements OnInit {
  user$: Observable<User> = new Observable<User>();
  userId: string = '';
  userName: string;
  donor: UpdateDonor;
  checked: boolean;
  location = { longitude: 0, latitude: 0 };

  constructor(
    private account: AccountService,
    private service: DonorService,
    private router: Router,
    private dialog: MatDialog,
    private notify: ToastrService
  ) {}

  ngOnInit() {
    this.user$ = this.account.currentUser$;
    this.user$.subscribe((res) => {
      this.userId = res.userId;
      this.userName = `${res.firstName} ${res.lastName}`;
    });
    this.getDonorInfo();
  }

  getDonorInfo = () => {
    this.service.getDonor(this.userId).subscribe(
      (res) => {
        this.donor = res;
        this.location.latitude = res.latitude;
        this.location.longitude = res.longitude;
        this.checked = res.isLocationUpdateAuto;
      },
      (error) => {
        console.log(error);
        this.router.navigateByUrl('donorUpdate');
      }
    );
  };

  onClickToggole = () => {
    this.service
      .updateMapMode(this.donor.donorIdPk, !this.checked)
      .subscribe((res: any) => {
        this.checked = res;
      });
  };

  setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (pos) {
            this.location.longitude = pos.coords.longitude;
            this.location.latitude = pos.coords.latitude;
          }
        },
        (error) => {},
        { enableHighAccuracy: true, maximumAge: 60000, timeout: 5000 }
      );
    }
  };

  updateLocation = () => {
    this.service
      .locationUpdate(
        this.userId,
        this.location.longitude,
        this.location.latitude
      )
      .subscribe((res: any) => this.notify.success(res?.message));
  };

  clickUpdateMap = () => {
    if (this.location.latitude === 0) this.setCurrentLocation();

    this.dialog
      .open(PointMapComponent, { data: this.location })
      .afterClosed()
      .subscribe((res) => {
        this.location.latitude = res.latitude;
        this.location.longitude = res.longitude;
        this.updateLocation();

        this.donor.latitude = res.latitude;
        this.donor.longitude = res.longitude;
      });
  };
}
