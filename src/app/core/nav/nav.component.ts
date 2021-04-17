import { User } from './../models/user';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  user$: Observable<User> = new Observable<User>();

  collapse: boolean=true;

  constructor(private service: AccountService) {}

  ngOnInit() {
    this.user$ = this.service.currentUser$;
  }

  logout = () => {
    this.service.logout();
  };
}
