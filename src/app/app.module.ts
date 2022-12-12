
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { SwiperModule } from 'swiper/angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PostsModule } from './components/posts.module';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { FilterUserPipe } from './pipes/filter-user.pipe';
import { HttpClientModule } from '@angular/common/http';
import { VideoComponent } from './pages/video/video.component';
import { SwiperSliderComponent } from './swiper-slider/swiper-slider.component';
import { PopularPostsSliderComponent } from './popular-posts-slider/popular-posts-slider.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { SharedModule } from './shared/shared.module';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { HomeComponent } from './pages/home/home.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { MapComponent } from './pages/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    PostDetailsComponent,
    AddPostComponent,
    PostDetailsComponent,
    EditPostComponent,
    LoginComponent,
    PageNotFoundComponent,
    DateAgoPipe,
    FilterUserPipe,
    MapComponent, 
    WeatherComponent,
    VideoComponent,
    SwiperSliderComponent,
    PopularPostsSliderComponent,
    GalleryComponent,
  ],
  imports: [
    NgxYoutubePlayerModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxPaginationModule,
    PostsModule,
    SwiperModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage())
  ],
  providers: [
    ScreenTrackingService,UserTrackingService,
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);