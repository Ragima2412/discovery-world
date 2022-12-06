import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChildren } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PostsDataService } from 'src/app/services/posts-data/posts-data.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';
import { PagingConfig } from '../models/paging-config.model';
import { Post } from '../models/post';
const _ = require("lodash");


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements PagingConfig, OnInit {

  title = 'ngx-paging-sample';
  cityName: string;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  tableSize: number[] = [8, 12, 16];
  pagingConfig: PagingConfig = {} as PagingConfig;

  private destroy$: Subject<void> = new Subject<void>();
  public isAuth: boolean = false;
  public user: any = '';
  public posts: Post[];
  public isLoading: boolean = false;
  public errorMessage: string = '';
  public isNoItems = false;

  constructor(
    private storageService: StorageService,
    private postDataService: PostsDataService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private userDataService: UserDataService,
  ) {
    this.pagingConfig.itemsPerPage = 8;
    this.pagingConfig.currentPage = 1;
  }
  
  ngOnInit() {
    this.isLoading = true;
    this.getUser();
    this.getPosts();
    this.getAllUser();
  }

  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.getPosts();
  }
  onTableSizeChange(event: any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.getPosts();
  }

  getPosts() {       
    this.postDataService.posts$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((posts: Post[]) => {  
        this.posts = _.cloneDeep(posts);
        this.isNoItems = this.posts.length > 0 ? false : true;
        this.pagingConfig.totalItems = posts.length;    
        if(posts.length) {
          this.isLoading = false; 
        }
        this.changeDetectorRef.markForCheck();
      }, (error) => {
        this.errorMessage = error;
        this.isLoading = false; 
      })
  }

  getUser() {
    this.storageService.getItem('userData').subscribe(val => {
      const userData = JSON.parse(val);
      if (userData) {
        this.user = _.cloneDeep(userData?.user);          //clear
        this.isAuth = _.cloneDeep(userData?.isAuth);      //clear
        this.changeDetectorRef.markForCheck();            //clear
      } else {
        this.isAuth = false;
        this.user = {} as User;
      }
    });
  }

  getAllUser() {
   this.userDataService.users$.subscribe(val => {
    this.storageService.setItem('allUsers', JSON.stringify(val))
   })
  }

  onNewPostClick() {
    if (!this.user.id) {
      const popup = document.querySelector('#newPostPopup');
      popup?.classList.toggle('show')
    } else {
      this.router.navigate(['/posts/add'])
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
