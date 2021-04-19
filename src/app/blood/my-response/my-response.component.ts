import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
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
  pageCount: number = 0;
  pageEvent: PageEvent;
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

  public getServerData(event: any) {
    this.service
      .getBloodResponsedByUser(this.userId, event.pageIndex, event.pageSize)
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.data);

        this.pageCount = res.total;
        this.pageNumber = res.pageNumber;
        this.pageSize = res.pageSize;
      });
    return event;
  }

  getCurrentDonor = () => {
    this.donorService
      .getDonor(this.userId)
      .subscribe((res) => (this.donorId = res.donorIdPk));
  };

  responseView = (requestId: number) => {
    this.service.getBloodRequestById(requestId).subscribe((res) => {
      res.forMyRequest = false;
      res.cancelDonor = this.donorId;
      this._bottomSheet
        .open(ViewRequestComponent, { data: res })
        .afterClosed()
        .subscribe(() => {
          this.pageNumber -= 1;
          this.getResponse();
        });
    });
  };

  getResponse = () => {
    this.service
      .getBloodResponsedByUser(this.userId, this.pageNumber, this.pageSize)
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.data);

        this.pageCount = res.total;
        this.pageNumber = res.pageNumber;
        this.pageSize = res.pageSize;
      });
  };
}
