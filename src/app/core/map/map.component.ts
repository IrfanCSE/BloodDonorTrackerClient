import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../../core/models/location';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() multiple: boolean = false;
  @Input() locations: Location[] = [];
  type = 'satellite';

  constructor() {}

  ngOnInit() {}
}
