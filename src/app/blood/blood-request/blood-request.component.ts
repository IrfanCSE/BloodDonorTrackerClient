import { ToastrService } from 'ngx-toastr';
import { RequestTable } from './../../core/models/requestTable';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { GetBloodRequest } from 'src/app/core/models/getBloodRequest';
import { DonorService } from 'src/app/donor/donor.service';
import { BloodService } from '../blood.service';
// import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ViewRequestComponent } from './view-request/view-request.component';

@Component({
  selector: 'app-blood-request',
  templateUrl: './blood-request.component.html',
  styleUrls: ['./blood-request.component.scss'],
})
export class BloodRequestComponent implements OnInit {
  userId: string;
  donorId: number;
  pageNumber: number = 1;
  pageSize: number = 10;
  // requests: GetBloodRequest[];
  // request: GetBloodRequest;

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
  }

  currentUser = () => {
    this.account.currentUser$.subscribe((res) => {
      this.userId = res.userId;
      this.getAvailableBloodRequest();
      this.getCurrentDonor();
    });
  };

  getCurrentDonor = () => {
    this.donorService
      .getDonor(this.userId)
      .subscribe((res) => (this.donorId = res.donorIdPk));
  };

  getAvailableBloodRequest = () => {
    this.service
      .getBloddRequests(this.userId, this.pageNumber, this.pageSize)
      .subscribe((res: any) => {
        // this.requests = res.data;
        this.dataSource = new MatTableDataSource(res.data);
      });
  };

  responseView = (requestId: number) => {
    this.service.getBloodRequestById(requestId).subscribe((res) => {
      // this.request = res;
      this._bottomSheet.open(ViewRequestComponent, { data: res });

      // this._bottomSheet.afterAllClosed.subscribe((result) => {
      //   console.log(`Dialog result: ${result}`);
      // });
    });
  };

  responseRequest = (requestId: number) => {
    this.service
      .ResponsedOnBloodRequest(requestId, this.donorId)
      .subscribe((res: any) => {
        this.notify.success(res?.message);
        this.getAvailableBloodRequest();
        // this.router.navigateByUrl('/your_response');
      });
  };
}
