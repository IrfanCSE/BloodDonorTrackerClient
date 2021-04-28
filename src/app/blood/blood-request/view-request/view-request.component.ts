import { ToastrService } from 'ngx-toastr';
import { BloodService } from './../../blood.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';

import { GetBloodRequest } from 'src/app/core/models/getBloodRequest';
import { DonorService } from 'src/app/donor/donor.service';
import { ViewDonorComponent } from 'src/app/donor/view-donor/view-donor.component';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss'],
})
export class ViewRequestComponent implements OnInit {
  longitude: number = 0;
  latitude: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GetBloodRequest,
    private service: BloodService,
    private notify: ToastrService,
    private _bottomSheet: MatDialogRef<GetBloodRequest>,
    private donorService: DonorService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.longitude = this.data.longitude;
    this.latitude = this.data.latitude;
  }

  onRemoveDonor = () => {
    this.service
      .RemoveResponsedOnBloodRequest(this.data.bloodRequestIdPk)
      .subscribe((res: any) => {
        this.notify.success(res?.message);
        this._bottomSheet.close();
      });
  };

  onCancelResponse = () => {
    this.service
      .CancelResponsedOnBloodRequest(
        this.data.bloodRequestIdPk,
        this.data.responsedDonorFk
      )
      .subscribe((res: any) => {
        this.notify.success(res?.message);
        this._bottomSheet.close();
      });
  };

  viewDonorById = (donorId: number) => {
    this.donorService.getDonorById(donorId).subscribe((res) => {
      this._bottomSheet.close();
      this.dialog.open(ViewDonorComponent, { data: res });
    });
  };
}
