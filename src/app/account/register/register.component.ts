import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+@[0-9]+$')]],
    confirmPassword: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  public get getRegister() {
    return this.registerForm.controls;
  }

  onSubmit = () => {
    console.log(this.registerForm.value);
  };
}
