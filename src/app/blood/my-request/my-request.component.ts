import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { DonorTable } from 'src/app/core/models/donorTable';
import { GetBloodRequest } from 'src/app/core/models/getBloodRequest';
import { RequestTable } from 'src/app/core/models/requestTable';
import { DonorService } from 'src/app/donor/donor.service';
import { BloodService } from '../blood.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewRequestComponent } from '../blood-request/view-request/view-request.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-my-request',
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.scss'],
})
export class MyRequestComponent implements OnInit {
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
  ];

  constructor(
    private account: AccountService,
    private service: BloodService,
    private donorService: DonorService,
    private router: Router,
    private notify: ToastrService,
    private _bottomSheet: MatDialog
  ) {}

  ngOnInit() {
    this.currentUser();
    this.getServerData(null);
  }

  currentUser = () => {
    this.account.currentUser$.subscribe((res) => {
      this.userId = res.userId;
      this.getCurrentDonor();
      this.getRequest();
    });
  };

  public getServerData(event: any) {
    this.service
      .getBloodRequestsByUser(this.userId, event.pageIndex, this.pageSize)
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
      this._bottomSheet.open(ViewRequestComponent, { data: res });
    });
  };

  getRequest = () => {
    this.service
      .getBloodRequestsByUser(this.userId, this.pageNumber, this.pageSize)
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.data);

        this.pageCount = res.total;
        this.pageNumber = res.pageNumber;
        this.pageSize = res.pageSize;
      });
  };

  removeRequest = (requestId: number) => {
    this.service.RemoveBloodRequest(requestId).subscribe((res: any) => {
      this.getRequest();
      this.notify.success(res?.message);
    });
  };

  navigateToEditPage = (requestId: number) => {
    this.router.navigateByUrl(`/create_request/${requestId}`);
  };

  navigateToCreatePage = () => {
    this.router.navigateByUrl('/create_request/');
  };
}
