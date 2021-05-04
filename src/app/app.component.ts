import { Observable } from 'rxjs';
import { User } from './core/models/user';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { DonorRequestService } from './donor-request/donor-request.service';
import { DonorService } from './donor/donor.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Blood Donor Tracker';
  user$: Observable<User>;
  donorId: any;

  constructor(
    private service: AccountService,
    private notify: ToastrService,
    private donorService: DonorService,
    private donorReq: DonorRequestService
  ) {}
  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser = () => {
    const token = localStorage.getItem('token');
    this.service.loadCurrentUser(token).subscribe(() => {
      this.user$ = this.service.currentUser$;
    });
  };
}
