import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { inMemoryPersistence } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import SwiperCore, { Keyboard, Pagination, Navigation, Virtual, Swiper } from 'swiper';
import { Post } from '../components/models/post';

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual]);


@Component({
  selector: 'app-swiper-slider',
  templateUrl: './swiper-slider.component.html',
  styleUrls: [ './swiper-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SwiperSliderComponent implements OnInit {
@Input()
posts: Post[];

  
  slides$ = new BehaviorSubject<string[]>(['']);

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.slides$.next(
      Array.from({ length: 50 }).map((el, index) => `Slide ${index + 1}`)
    );
  }
  
  setSwiperInstance(swiper: Swiper) {
    setInterval(() => {
      swiper?.slideNext();
    }, 4000);
  }

  onClick(post: Post) {
    this.router.navigate([`posts/view/${post.id}`])
  }
  
  swiperConfig: any = {
    slidesPerView: 'auto',
    spaceBetween: 20,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1100: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1450: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    }
}
}
