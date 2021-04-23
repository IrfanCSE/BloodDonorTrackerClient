import { PostDonorRequest } from './../../core/models/postDonorRequest';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GetBloodRequest } from 'src/app/core/models/getBloodRequest';
import { DonorRequestService } from 'src/app/donor-request/donor-request.service';
import { BloodService } from '../blood.service';

@Component({
  selector: 'app-assign-blood-request',
  templateUrl: './assign-blood-request.component.html',
  styleUrls: ['./assign-blood-request.component.scss'],
})
export class AssignBloodRequestComponent implements OnInit {
  bloodRequest: GetBloodRequest[] = [];
  postReq: PostDonorRequest;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notify: ToastrService,
    private service: BloodService,
    private donorReq: DonorRequestService,
    private fb: FormBuilder,
    private dialog: MatDialogRef<any>,
  ) {}

  ngOnInit() {
    this.loadMyRequest();
    console.log('this.data');
    console.log(this.data);
  }

  requestForm = this.fb.group({ requestId: ['', Validators.required] });

  loadMyRequest = () => {
    this.service
      .getMyBloddRequests(this.data?.seekerId)
      .subscribe((res) => (this.bloodRequest = res));
  };

  assignRequst = () => {
    this.postReq = {
      bloodRequestIdFk: this.requestForm.value.requestId,
      requestDonorIdFk: this.data?.donorId,
      requestUserIdFk: this.data?.seekerId,
    };

    this.donorReq.postDonorRequest(this.postReq).subscribe((res: any) => {
      this.dialog.close();
      this.notify.success(res?.message);
    });
  };
}
