import { DonorService } from './../donor/donor.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AccountService } from '../account/account.service';
import { BloodService } from '../blood/blood.service';
import { DonorTable } from '../core/models/donorTable';
import { Location } from '../core/models/location';
import { UpdateDonor } from '../core/models/updateDonor';

@Component({
  selector: 'app-blood',
  templateUrl: './blood.component.html',
  styleUrls: ['./blood.component.scss'],
})
export class BloodComponent implements OnInit {
  userId: string;
  pageNumber: number = 0;
  pageSize: number = 0;
  donor: UpdateDonor;

  locations: Location[];

  dataSource: MatTableDataSource<DonorTable>;
  displayedColumns: string[] = [
    'name',
    'bloodGroup',
    'address',
    'distance',
    'action',
  ];

  constructor(
    private account: AccountService,
    private service: BloodService,
    private donorService: DonorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser();
  }

  currentUser = () => {
    this.account.currentUser$.subscribe((res) => {
      this.userId = res.userId;
      this.getBloodDonors();
      this.getDonorInfo();
    });
  };

  getBloodDonors = () => {
    this.service
      .getDonors(this.userId, this.pageNumber, this.pageSize)
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.data);

        this.locations = res.data;

        // .map((x: any) => ({
        //   latitude: x.latitude,
        //   longitude: x.longitude,
        // }))

        // this.locations.push(res.data);
        console.log('this.locations');
        console.log(this.locations);
      });
  };

  getDonorInfo = () => {
    this.donorService.getDonor(this.userId).subscribe(
      (res) => {
        this.donor = res;
      },
      (error) => {
        console.log(error);
        this.router.navigateByUrl('donorUpdate');
      }
    );
  };

  makeRequest = (userIdFk: string) => {
    console.log('makeRequest');
    console.log(userIdFk);
  };
}
