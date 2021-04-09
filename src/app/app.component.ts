import { User } from './core/models/user';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Blood Donor Tracker';

  constructor(private service: AccountService, private notify: ToastrService) {}
  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.service.loadCurrentUser(token).subscribe((res: User) => {
      console.log('res : ' + res?.userName);
      if (res !== null) {
        console.log('load current user ' + res?.userName);
        this.notify.show(`Hi ${res?.userName} , Wellcome back!`);
      } else {
        console.log('no user found');
      }
    });
  }
}
