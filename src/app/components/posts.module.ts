import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsDataService } from '../services/posts-data/posts-data.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../pipes/filter.pipe';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
    declarations: [
        PostComponent,
        PostsComponent, 
        FilterPipe,
        SpinnerComponent,
    ],
    providers: [PostsDataService],
    imports: [CommonModule, FormsModule, HttpClientModule, FormsModule, NgxPaginationModule, ]
})
  export class PostsModule {}