import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopularPostsSliderComponent } from 'src/app/popular-posts-slider/popular-posts-slider.component';

describe('PopularPostsSliderComponent', () => {
  let component: PopularPostsSliderComponent;
  let fixture: ComponentFixture<PopularPostsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularPostsSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularPostsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
