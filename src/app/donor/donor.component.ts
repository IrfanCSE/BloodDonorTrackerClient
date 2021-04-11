import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../core/models/user';
import { DonorService } from './donor.service';
import { UpdateDonor } from '../core/models/updateDonor';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.scss'],
})
export class DonorComponent implements OnInit {
  user$: Observable<User> = new Observable<User>();
  userId: string = '';
  donor: UpdateDonor;

  constructor(
    private account: AccountService,
    private service: DonorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user$ = this.account.currentUser$;
    this.user$.subscribe((res) => (this.userId = res.userName));
    this.getDonorInfo();
  }

  getDonorInfo = () => {
    this.service.getDonor(this.userId).subscribe(
      (res) => {
        this.donor = res;
      },
      () => {
        this.router.navigateByUrl('donorUpdate');
      }
    );
  };
}
