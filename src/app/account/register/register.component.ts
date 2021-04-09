import { User } from './../../core/models/user';
import { AccountService } from 'src/app/account/account.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ConfirmedValidator } from '../../core/confirmed.validator';
import { UserReg } from 'src/app/core/models/userReg';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  passMatch = true;
  user: UserReg = {
    confirmPassword: '',
    dateOfBirth: new Date(),
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    userName: '',
  };

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern('^[a-zA-Z]+@[0-9]+$')],
    ],
    confirmPassword: ['', [Validators.required, ConfirmedValidator]],
    userName: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
  });
  constructor(private fb: FormBuilder, private service: AccountService) {}

  ngOnInit() {}

  public get getRegister(): any {
    return this.registerForm.controls;
  }

  confirmPassCheck = () => {
    if (
      this.registerForm.controls.password.value ===
      this.registerForm.controls.confirmPassword.value
    ) {
      this.passMatch = true;
    } else {
      this.passMatch = false;
    }
  };

  onSubmit = () => {
    console.log(this.getRegister.password.value);
    const get = this.getRegister.password.value;
    this.user = {
      confirmPassword: get.confirmPassword,
      dateOfBirth: get.dateOfBirth,
      email: get.email,
      firstName: get.firstName,
      lastName: get.lastName,
      password: get.password,
      userName: get.userName,
    };
    this.service.registerUser(this.user).subscribe((res) => console.log(res));
  };
}
