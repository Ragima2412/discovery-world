import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    this.onBannerSliderMode();
    this.parallaxEffect();
  }

  onBannerSliderMode() {
  let slides = document.querySelectorAll('.slide');
  let btns = document.querySelectorAll('.btn');
  let currentSlide = 1;

  //JS for manual navigation
  let manualNav = function(manual: any) {
   slides.forEach((slide) => {
   slide.classList.remove('active');
   btns.forEach((btn) => {
    btn.classList.remove('active');
  })
  })

  slides[manual].classList.add('active');
  btns[manual].classList.add('active');
  }

  btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      manualNav(i);
      currentSlide = i;
    })
  })

  let repeat =  function() {
   let active = document.getElementsByClassName('active');
   let i = 1;

   var repeater = () => {
    setTimeout(function() {
      Array.from(active).forEach((activeSlide) => {
        activeSlide.classList.remove('active');
      })
      slides[i].classList.add('active');
      btns[i].classList.add('active');
      i++;
      
      if(slides.length == i) {
       i = 0;   
      }
      if(i >= slides.length) {
      return;
       }
       repeater()
    }, 5000)
   }
   repeater();
  }
  repeat();
}
parallaxEffect() {
  const parallax = document.getElementById('parallax')! as HTMLDivElement;
  window.addEventListener('scroll', () => {
   let offSet = window.pageYOffset;
   // console.log(offSet * 0.7)
   parallax.style.backgroundPositionY = offSet * 1 + 'px';
  })
}
}
