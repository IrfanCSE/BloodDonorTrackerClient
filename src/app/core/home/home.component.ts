import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // images = [700, 533, 807, 124].map(
  //   (n) => `https://picsum.photos/id/${n}/900/500`
  // );

  images = ['blood_donor', 'blood_sample', 'blood_doctor', 'google_map'].map(
      (n) => `https://source.unsplash.com/900x500/?${n}`
    );

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {}
}
