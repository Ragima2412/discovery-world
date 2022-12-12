import {  ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PostsDataService } from 'src/app/services/posts-data/posts-data.service';
import { Post } from '../models/post';
const _ = require("lodash");

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();
  public posts:Post[];
  public popularPosts: Post[];
  public isPublicPostsLoading: boolean = false;
  public isAllPostsLoading: boolean = false;
  constructor(
    private postDataService: PostsDataService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}
  
  ngOnInit(): void {
    this.isPublicPostsLoading = true;
    this.isAllPostsLoading = true;
    this.getPosts();
    this.onBannerSliderMode();
    this.parallaxEffect();
    this.quotesSlideShow();
  }

  getPosts() {  
    this.isPublicPostsLoading = true; 
    this.isAllPostsLoading = true;   
    this.postDataService.posts$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((posts: Post[]) => {  
        this.getPopularPosts(posts);
        if(posts.length) {
          this.isPublicPostsLoading = false;
          this.isAllPostsLoading = false;
        }
        let postsList: Post[] = Array.from({ length: 10 });
        this.posts = postsList.map((el: any )=> {
          el = [...posts];
          return el
        }).flatMap(el => el);
        this.changeDetectorRef.markForCheck();
      }, (error) => {
        console.log('err', error)
      })
  }

  getPopularPosts(posts: Post[]) {
    let postsList: Post[] = Array.from({ length: 10 });
   let sortedList =posts.sort((a: any, b: any) => Object.keys(b.likes).length - Object.keys(a.likes).length);
   sortedList.length = sortedList.length > 5 ? 5 : sortedList.length;
   this.popularPosts = postsList.map((el: any )=> {
    el = [...posts];
    return el
  }).flatMap(el => el);
  }

  onBannerSliderMode() {
    let slides = document.querySelectorAll('.slide');
    let btns = document.querySelectorAll('.btn');
    let currentSlide = 1;

    let manualNav = function (manual: any) {
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

    let repeat = function () {
      let active = document.getElementsByClassName('active');
      let i = 1;

      var repeater = () => {
        setTimeout(function () {
          Array.from(active).forEach((activeSlide) => {
            activeSlide.classList.remove('active');
          })
          slides[i].classList.add('active');
          btns[i].classList.add('active');
          i++;

          if (slides.length == i) {
            i = 0;
          }
          if (i >= slides.length) {
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

    function showSlides(n: any) {
      var i;
      var slides = document.getElementsByClassName("mySlides")! as HTMLCollectionOf<HTMLDivElement>;
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }
    window.onload = function () {
      setInterval(function () {
        plusSlides(1);
      }, 4000);
    }
  }
}
