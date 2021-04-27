import { UpdateDonor } from './../../core/models/updateDonor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { UpdatUser } from 'src/app/core/models/updatUser';
import { User } from 'src/app/core/models/user';
import { DonorService } from '../donor.service';

@Component({
  selector: 'app-donor-account',
  templateUrl: './donor-account.component.html',
  styleUrls: ['./donor-account.component.scss'],
})
export class DonorAccountComponent implements OnInit {
  user$: Observable<User> = new Observable<User>();
  userId: string;
  // donorId: number;
  // donorName: string;
  passField: boolean = false;
  userData: UpdatUser;

  constructor(
    private account: AccountService,
    private service: DonorService,
    private router: Router,
    private fb: FormBuilder,
    private notify: ToastrService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  userForm = this.fb.group({
    userId: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthday: ['', Validators.required],
  });

  passwordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ],
    ],
  });

  getCurrentUser = () => {
    this.user$ = this.account.currentUser$;
    this.user$.subscribe((res: any) => {
      this.userId = res.userId;
      this.userData = res;
      this.setDefaultValue();
    });
  };

  setDefaultValue = () => {
    this.userForm.patchValue({
      userId: this.userData?.userId,
      firstName: this.userData?.firstName,
      lastName: this.userData?.lastName,
      birthday: this.userData?.birthday,
    });
  };

  onSubmit = () => {
    this.account
      .updateCurrentUser(this.userForm.value)
      .subscribe((res: any) => {
        this.notify.success(res?.message);
        this.router.navigateByUrl('/donor');
      });
  };

  togglePassword = () => {
    this.passField = !this.passField;
  };

  onPasswordSubmit = () => {
    let data = this.passwordForm.value;
    this.account
      .changePassword(this.userId, data.oldPassword, data.newPassword)
      .subscribe((res: any) => {
        this.notify.success(res?.message);
        this.account.logout();
        this.router.navigateByUrl('/account');
      });
  };
}
