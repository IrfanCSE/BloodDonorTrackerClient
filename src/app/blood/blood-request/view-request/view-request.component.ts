import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GetBloodRequest } from 'src/app/core/models/getBloodRequest';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss'],
})
export class ViewRequestComponent implements OnInit {
  longitude: number = 0;
  latitude: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: GetBloodRequest) {}

  ngOnInit() {
    this.longitude = this.data.longitude;
    this.latitude = this.data.latitude;
  }
}
