import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../core/models/user';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  PatternValidator,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  hide = true;
  returnUrl = '/';

  constructor(
    private fb: FormBuilder,
    private service: AccountService,
    private notify: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  public get getLogin() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.service.login(this.loginForm.value).subscribe((res: any) => {
      this.notify.success(`Hi ${res?.userName} , Wellcome back!`);
      this.router.navigateByUrl('/');
    });
  }
}
