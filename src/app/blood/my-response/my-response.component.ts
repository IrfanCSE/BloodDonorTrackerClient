import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { GetBloodRequest } from 'src/app/core/models/getBloodRequest';
import { RequestTable } from 'src/app/core/models/requestTable';
import { DonorService } from 'src/app/donor/donor.service';
import { ViewRequestComponent } from '../blood-request/view-request/view-request.component';
import { BloodService } from '../blood.service';

@Component({
  selector: 'app-my-response',
  templateUrl: './my-response.component.html',
  styleUrls: ['./my-response.component.scss'],
})
export class MyResponseComponent implements OnInit {
  userId: string;
  donorId: number;
  pageNumber: number = 0;
  pageSize: number = 0;
  request: GetBloodRequest;

  dataSource: MatTableDataSource<RequestTable>;
  displayedColumns: string[] = [
    'name',
    'bloodGroup',
    'date',
    'time',
    'address',
    'action',
    'status',
  ];

  constructor(
    private account: AccountService,
    private service: BloodService,
    private donorService: DonorService,
    private router: Router,
    private _bottomSheet: MatDialog
  ) {}

  ngOnInit() {
    this.currentUser();
  }

  currentUser = () => {
    this.account.currentUser$.subscribe((res) => {
      this.userId = res.userId;
      this.getCurrentDonor();
      this.getResponse();
    });
  };

  getCurrentDonor = () => {
    this.donorService
      .getDonor(this.userId)
      .subscribe((res) => (this.donorId = res.donorIdPk));
  };

  responseView = (requestId: number) => {
    this.service.getBloodRequestById(requestId).subscribe((res) => {
      this._bottomSheet.open(ViewRequestComponent, { data: res });
    });
  };

  getResponse = () => {
    this.service
      .getBloodResponsedByUser(this.userId, this.pageNumber, this.pageSize)
      .subscribe(
        (res: any) => (this.dataSource = new MatTableDataSource(res.data))
      );
  };
}
