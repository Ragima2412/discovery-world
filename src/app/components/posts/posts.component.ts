import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
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
})
export class PostsComponent implements PagingConfig, OnInit {
  cityName: string;
  
  title = 'ngx-paging-sample';
  currentPage:number  = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  tableSize: number[] = [5, 10, 15];
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
   
    // this.getPosts();  
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }
  
  ngOnInit() {
    this.isLoading = true;
    this.getUser();
    this.getPosts();  
    this.getAllUser();
  }

  onTableDataChange(event: any) {
    this.pagingConfig.currentPage  = event;
    this.getPosts();
  }
  onTableSizeChange(event: any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage;
    this.getPosts();
  }

  getPosts() {       
    this.postDataService.posts$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((posts: Post[]) => {  
        this.posts = posts;
        this.isNoItems = this.posts.length > 0 ? false : true;
        this.pagingConfig.totalItems = this.posts.length;    
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
        this.user = _.cloneDeep(userData?.user); 
        this.isAuth = _.cloneDeep(userData?.isAuth); 
        this.changeDetectorRef.markForCheck();    
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
