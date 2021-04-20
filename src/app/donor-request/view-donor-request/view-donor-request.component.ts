import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DonorRequestService } from '../donor-request.service';
import { GetDonorRequest } from '../../core/models/getDonorRequest';

@Component({
  selector: 'app-view-donor-request',
  templateUrl: './view-donor-request.component.html',
  styleUrls: ['./view-donor-request.component.scss'],
})
export class ViewDonorRequestComponent implements OnInit {
  donorRequest: GetDonorRequest;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<number>,
    private service: DonorRequestService
  ) {}

  ngOnInit() {
    this.getDonorRequest();
  }

  getDonorRequest = () => {
    this.service
      .getDonorRequestById(this.data.reqId)
      .subscribe((res) => (this.donorRequest = res));
  };

  onAction = (status: boolean) => {
    this.service
      .responseOnDonorRequest(this.data.reqId, this.data.donorId, status)
      .subscribe(() => this.dialog.close());
  };
}
