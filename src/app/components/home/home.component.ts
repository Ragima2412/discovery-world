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
    this.quotesSlideShow();
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

quotesSlideShow() {
  var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n: any) {
  showSlides(slideIndex += n);
}

function currentSlide(n: any) {
  showSlides(slideIndex = n);
}

function showSlides(n:any) {
  var i;
  var slides = document.getElementsByClassName("mySlides")! as HTMLCollectionOf<HTMLDivElement> ;
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
window.onload= function () {
 setInterval(function(){ 
     plusSlides(1);
 }, 3000);
 }

}
}
