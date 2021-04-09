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

  constructor(private fb: FormBuilder, private service: AccountService) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required,
      Validators.pattern('^[a-zA-Z]+@[0-9]+$'),]
    ],
  });

  ngOnInit(): void {}


  public get getLogin(){
    return this.loginForm.controls;
  }


  onSubmit() {
    console.log(this.getLogin);
  }
}
