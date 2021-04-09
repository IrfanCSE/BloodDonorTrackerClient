import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ConfirmedValidator } from '../../core/confirmed.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  passMatch = true;

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
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  public get getRegister(): any {
    return this.registerForm.controls;
  }

  change = () => {
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
  };
}
