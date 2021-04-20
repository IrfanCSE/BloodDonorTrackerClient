import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
import { GetDonorRequest } from '../core/models/getDonorRequest';
import { User } from '../core/models/user';
import { DonorRequestService } from '../donor-request/donor-request.service';
import { DonorService } from '../donor/donor.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewDonorRequestComponent } from './view-donor-request/view-donor-request.component';

@Component({
  selector: 'app-donor-request',
  templateUrl: './donor-request.component.html',
  styleUrls: ['./donor-request.component.scss'],
})
export class DonorRequestComponent implements OnInit {
  user$: Observable<User> = new Observable<User>();
  userId: string = '';
  donorId: number;
  donorRequests: GetDonorRequest[];

  constructor(
    private service: DonorRequestService,
    private donor: DonorService,
    private account: AccountService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.currentUser();
  }

  requestLoad = () => {
    this.service.getDonorRequestForDonor(this.donorId).subscribe((res) => {
      this.donorRequests = res;
    });
  };

  currentUser = () => {
    this.user$ = this.account.currentUser$;
    this.user$.subscribe((res) => {
      this.userId = res.userId;
      this.getDonorInfo();
    });
  };

  getDonorInfo = () => {
    this.donor.getDonor(this.userId).subscribe((res) => {
      this.donorId = res.donorIdPk;
      this.requestLoad();
    });
  };

  onTOuch = (donorReqId: number) => {
    this.service.isReadDonorRequest(donorReqId).subscribe();
  };

  onClickHeading = (donorRequestId: number) => {
    this.onTOuch(donorRequestId);
    this.dialog
      .open(ViewDonorRequestComponent, {
        data: { reqId: donorRequestId, donorId: this.donorId },
      })
      .afterClosed()
      .subscribe(() => {
        this.requestLoad();
      });
  };
}
