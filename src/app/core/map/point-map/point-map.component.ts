import { Location } from './../../models/location';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-point-map',
  templateUrl: './point-map.component.html',
  styleUrls: ['./point-map.component.scss'],
})
export class PointMapComponent implements OnInit {
  mapClickListener: any;
  map: any;
  zone: any;
  
  constructor(
    private dialogRef: MatDialogRef<Location>,
    @Inject(MAT_DIALOG_DATA) public data: Location
  ) {}

  ngOnInit() {}

  SetLocation = (lat: number, lon: number) => {
    this.data.latitude = lat;
    this.data.longitude = lon;
  };

  public mapReadyHandler(map: google.maps.Map): void {
    this.map = map;
    this.mapClickListener = this.map.addListener(
      'click',
      (e: google.maps.MouseEvent) => {
        // console.log(e.latLng.lat(), e.latLng.lng());
        this.SetLocation(e.latLng.lat(), e.latLng.lng());
      }
    );
  }

  public ngOnDestroy(): void {
    if (this.mapClickListener) {
      this.mapClickListener.remove();
    }
  }

  onSave = () => {
    this.dialogRef.close(this.data);
  };
}
