import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GetBloodRequest } from 'src/app/core/models/getBloodRequest';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss'],
})
export class ViewRequestComponent implements OnInit {
  longitude: number = 91.8224896;
  latitude: number = 22.357606399999998;

  constructor(@Inject(MAT_DIALOG_DATA) public data: GetBloodRequest) {}

  ngOnInit() {
    console.log(this.data);
  }
}
