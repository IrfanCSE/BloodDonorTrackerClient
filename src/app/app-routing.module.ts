import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './account/register/register.component';
import { BloodComponent } from './blood/blood.component';
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './core/intercepter/guards/auth.guard';
import { DonorComponent } from './donor/donor.component';
import { EditDonorComponent } from './donor/edit-donor/edit-donor.component';
import { HealthReportComponent } from './donor/health-report/health-report.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'blood', component: BloodComponent },
  { path: 'donor', component: DonorComponent, canActivate: [AuthGuard] },
  {
    path: 'donorUpdate',
    component: EditDonorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'report',
    component: HealthReportComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
