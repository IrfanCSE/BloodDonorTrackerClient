import { ToastrService } from 'ngx-toastr';
import { BloodService } from './../../blood.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { GetBloodRequest } from 'src/app/core/models/getBloodRequest';

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
    private _bottomSheet: MatDialogRef<GetBloodRequest>
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
      .subscribe((res: any ) => {
        this.notify.success(res?.message);
        this._bottomSheet.close();
      });
  };
}
