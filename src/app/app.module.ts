import { AngularBootstrapModule } from './angular-bootstrap.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NavComponent } from './core/nav/nav.component';
import { HomeComponent } from './core/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './account/register/register.component';
import { ErrorInterceptor } from './core/intercepter/intercept/error-interceptor.interceptor';
import { BusyInterceptor } from './core/intercepter/intercept/busy.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DonorComponent } from './donor/donor.component';
import { EditDonorComponent } from './donor/edit-donor/edit-donor.component';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './core/map/map.component';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { HealthReportComponent } from './donor/health-report/health-report.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    NavComponent,
    RegisterComponent,
    DonorComponent,
    EditDonorComponent,
    MapComponent,
    HealthReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularBootstrapModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCBwRULi97IvZ_Ak1YNesVXpxk4P0iiBpM',
    }),
    AgmSnazzyInfoWindowModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BusyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
