import { ToastrService } from 'ngx-toastr';
import { BloodService } from './../../blood/blood.service';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostDonorRequest } from '../models/postDonorRequest';
import { AssignBloodRequestComponent } from 'src/app/blood/assign-blood-request/assign-blood-request.component';
import { AccountService } from 'src/app/account/account.service';
import { DonorService } from 'src/app/donor/donor.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DonorRequestService } from 'src/app/donor-request/donor-request.service';
import { GetBloodRequest } from '../models/getBloodRequest';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() multiple: boolean = false;
  @Input() locations: any;
  type = 'satellite';

  postReq: PostDonorRequest;
  userId: string;
  bloodRequest: GetBloodRequest[] = [];
  donorId: number;

  constructor(
    private _bottomSheet: MatDialog,
    private account: AccountService,
    private service: BloodService,
    private donorService: DonorService,
    private fb: FormBuilder,
    private notify: ToastrService,
    private donorReq: DonorRequestService
  ) {}

  ngOnInit() {
    this.currentUser();
  }

  onSendRequest = (item: any) => {
    console.log(item);

    this._bottomSheet.open(AssignBloodRequestComponent, {
      data: {
        seekerId: this.donorId,
        isMap:true,
        donor: item,
      },
    });
  };

  currentUser = () => {
    this.account.currentUser$.subscribe((res) => {
      this.userId = res.userId;
      this.getDonorInfo();
    });
  };

  getDonorInfo = () => {
    this.donorService.getDonor(this.userId).subscribe((res) => {
      this.donorId = res.donorIdPk;
    });
  };
}
