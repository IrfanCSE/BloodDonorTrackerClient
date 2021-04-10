import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

const bootstrap = [
  NgbPaginationModule,
  NgbAlertModule,
  NgbModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...bootstrap
  ],
  exports: [
    ...bootstrap
  ],
})

export class AngularBootstrapModule { }
