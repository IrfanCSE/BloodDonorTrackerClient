import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './account/register/register.component';
import { HomeComponent } from './core/home/home.component';
import { DonorComponent } from './donor/donor.component';
import { EditDonorComponent } from './donor/edit-donor/edit-donor.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'donor', component: DonorComponent },
  { path: 'donorUpdate', component: EditDonorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
