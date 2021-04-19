import { Location } from './../models/location';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() multiple: boolean = false;
  @Input() locations: any;
  type = 'satellite';

  constructor() {}

  ngOnInit() {
    console.log('this. from map');
    console.log(this.locations);
    console.log('this.latitude long');
    console.log(this.latitude);
    console.log(this.longitude);
  }
}
