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
  donorId: number;

  constructor(
    private _bottomSheet: MatDialog,
    private account: AccountService,
    private service: BloodService,
    private donorService: DonorService
  ) {}

  ngOnInit() {
    this.currentUser();
  }

  onSendRequest = (donorId: number) => {
    
    this._bottomSheet.open(AssignBloodRequestComponent, {
      data: {
        seekerId: this.donorId,
        donorId: donorId,
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
