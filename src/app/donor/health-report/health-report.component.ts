import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { CommonDDL } from 'src/app/core/models/commonDDL';
import { Report } from 'src/app/core/models/report';
import { UpdateDonor } from 'src/app/core/models/updateDonor';
import { User } from 'src/app/core/models/user';
import { DonorService } from '../donor.service';

@Component({
  selector: 'app-health-report',
  templateUrl: './health-report.component.html',
  styleUrls: ['./health-report.component.scss'],
})
export class HealthReportComponent implements OnInit {
  user$: Observable<User> = new Observable<User>();
  userId: string;
  donorId: number;
  donorName: string;
  report: Report;
  bloodGroups: any = [];

  constructor(
    private account: AccountService,
    private service: DonorService,
    private router: Router,
    private fb: FormBuilder,
    private notify: ToastrService
  ) {}

  reportForm = this.fb.group({
    bloodGroupIdFk: ['',Validators.required],
    donorIdFk: [''],
    lastDonationDate: ['',Validators.required],
    isAvailable: [''],
  });

  gerReportForm = () => {
    return this.reportForm.controls;
  };

  ngOnInit() {
    this.getCurrentUser();
    this.getBloodGroupsDDL();
  }

  setDefaultValue = () => {
    this.reportForm.patchValue({
      bloodGroupIdFk: this.report?.bloodGroupIdFk,
      donorIdFk: this.report?.donorIdFk,
      lastDonationDate: this.report?.lastDonationDate,
      isAvailable: this.report?.isAvailable,
    });
  };

  getCurrentUser = () => {
    this.user$ = this.account.currentUser$;
    this.user$.subscribe((res) => {
      this.userId = res.userId;
      this.getDonorInfo(this.userId);
    });
  };

  getDonorInfo = (userId: string) => {
    this.service.getDonor(userId).subscribe((res) => {
      this.donorId = res.donorIdPk;
      this.donorName = res.name;
      this.getDonorReport();
    });
  };

  getDonorReport = () => {
    this.service.getReport(this.donorId).subscribe((res) => {
      this.report = res;
      this.setDefaultValue();
    });
  };

  getBloodGroupsDDL = () => {
    this.service.getBloodGroups().subscribe((res) => {
      this.bloodGroups = res;
      console.log('blood Group list ddl: ');
      console.log(this.bloodGroups);
    });
  };

  OnHRSubmit = () => {
    let data = this.reportForm.value;
    data.donorIdFk = this.donorId;

    this.service.updateReport(data).subscribe((res: any) => {
      this.notify.success(res?.message);
      this.router.navigateByUrl('/donor');
    });
  };
}
