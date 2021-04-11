import { DonorService } from './../donor.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { UpdateDonor } from 'src/app/core/models/updateDonor';
import { User } from 'src/app/core/models/user';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-donor',
  templateUrl: './edit-donor.component.html',
  styleUrls: ['./edit-donor.component.scss'],
})
export class EditDonorComponent implements OnInit {
  user$: Observable<User> = new Observable<User>();
  userId: string = '';
  donor: UpdateDonor;
  constructor(
    private account: AccountService,
    private service: DonorService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user$ = this.account.currentUser$;
    this.user$.subscribe((res) => (this.userId = res.userName));
    this.getDonorInfo();
  }

  donorForm = this.fb.group({
    name: [''],
    nid: [''],
    phone: [''],
    address: [''],
  });

  getDonorInfo = () => {
    this.service.getDonor(this.userId).subscribe((res) => {
      this.donor = res;
    });
  };

  updateDonorInfo = () => {
    this.service.updateDonor(this.donor).subscribe((res) => {
      this.router.navigateByUrl('donor');
    });
  };

  OnSubmit = () => {
    console.log(this.donorForm.value);
  };
}
