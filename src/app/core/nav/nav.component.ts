import { User } from './../models/user';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { DonorRequestService } from 'src/app/donor-request/donor-request.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  user$: Observable<User> = new Observable<User>();
  donorId: number;
  notificationCounter$: Observable<number> = new Observable<number>();

  collapse: boolean = true;

  constructor(
    private service: AccountService,
    private donorReq: DonorRequestService
  ) {}

  ngOnInit() {
    this.user$ = this.service.currentUser$;
    this.notificationCounter$ = this.donorReq.currentNotification$;
  }

  logout = () => {
    this.service.logout();
  };
}
