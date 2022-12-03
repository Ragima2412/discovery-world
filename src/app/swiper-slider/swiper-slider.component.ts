import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import SwiperCore, { Keyboard, Pagination, Navigation, Virtual, SwiperOptions  } from 'swiper';

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual]);

@Component({
  selector: 'app-swiper-slider',
  templateUrl: './swiper-slider.component.html',
  styleUrls: ['./swiper-slider.component.scss']
})
export class SwiperSliderComponent implements OnInit {
  public posts = [
    'post1', 'post2', 'post3'
  ]

 
  slides$ = new BehaviorSubject<string[]>(['']);

  constructor() {}

  ngOnInit(): void {
    this.slides$.next(
      Array.from({ length: 600 }).map((el, index) => `Slide ${index + 1}`)
    );
  }
}
