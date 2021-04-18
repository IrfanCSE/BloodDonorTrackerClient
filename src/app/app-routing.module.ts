import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './account/register/register.component';
import { BloodRequestComponent } from './blood/blood-request/blood-request.component';
import { BloodComponent } from './blood/blood.component';
import { CreateRequestComponent } from './blood/create-request/create-request.component';
import { MyRequestComponent } from './blood/my-request/my-request.component';
import { MyResponseComponent } from './blood/my-response/my-response.component';
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
  { path: 'bloodrequest', component: BloodRequestComponent },
  { path: 'my_card', component: MyRequestComponent },
  { path: 'my_card_2', component: MyResponseComponent },
  { path: 'create_request/:id', component: CreateRequestComponent },
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
