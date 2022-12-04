import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import SwiperCore, { Keyboard, Pagination, Navigation, Virtual, Swiper } from 'swiper';

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual]);


@Component({
  selector: 'app-swiper-slider',
  templateUrl: './swiper-slider.component.html',
  styleUrls: [ './swiper-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SwiperSliderComponent implements OnInit {
  public posts = [
    {}, 'post2', 'post3'
  ]

  
  slides$ = new BehaviorSubject<string[]>(['']);

  constructor() {}

  ngOnInit(): void {
    this.slides$.next(
      Array.from({ length: 50 }).map((el, index) => `Slide ${index + 1}`)
    );
  }
  
  setSwiperInstance(swiper: Swiper) {
    setInterval(() => {
      swiper.slideNext();
    }, 4000);
  }
}
