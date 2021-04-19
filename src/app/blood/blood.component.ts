import { DonorService } from './../donor/donor.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AccountService } from '../account/account.service';
import { BloodService } from '../blood/blood.service';
import { DonorTable } from '../core/models/donorTable';
import { Location } from '../core/models/location';
import { UpdateDonor } from '../core/models/updateDonor';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-blood',
  templateUrl: './blood.component.html',
  styleUrls: ['./blood.component.scss'],
})
export class BloodComponent implements OnInit {
  userId: string;
  pageNumber: number = 0;
  pageSize: number = 0;
  pageCount: number = 0;
  donor: UpdateDonor;

  locations: Location[];

  pageEvent: PageEvent;
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
    this.getServerData(null);
  }

  public getServerData(event: any) {
    this.service
      .getDonors(this.userId, event.pageIndex, event.pageSize)
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.data);

        this.locations = res.data;

        this.pageNumber = res.pageNumber;
        this.pageSize = res.pageSize;
        this.pageCount = res.total;
      });
    return event;
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

        this.pageCount = res.total;
        this.pageNumber = res.pageNumber;
        this.pageSize = res.pageSize;
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

  onPageChange = (event: any) => {
    console.log('evnet');
    console.log(this.pageSize);
    console.log(this.pageCount);
    console.log(this.pageNumber);
  };

  makeRequest = (userIdFk: string) => {
    console.log('makeRequest');
    console.log(userIdFk);
  };
}
