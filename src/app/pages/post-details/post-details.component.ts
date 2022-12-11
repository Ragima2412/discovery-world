import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/components/models/post';
import { User } from 'src/app/components/models/user';
import { GetCityDataService } from 'src/app/services/get-city-data/get-city-data.service';
import { PostsDataService } from 'src/app/services/posts-data/posts-data.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';
import { VideoDataService } from 'src/app/services/video-data/video-data.service';
const _ = require("lodash");

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  public post: Post = {} as Post;
  public postId: string | null = null;
  public errorMessage: string | null = null;
  public tags: string[];
  public users: User[] = [];
  public user: User;
  public postCreatedUser: User | undefined;
  public comments: any = [];
  public commentCreatedUser: any;
  private destroy$: Subject<void> = new Subject<void>();
  public newComment = '';
  public isHidden: boolean = true;

  constructor(
    private storageService: StorageService,
    private postsDataService: PostsDataService,
    private activatedRoute: ActivatedRoute,
    private userDataService: UserDataService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private cityDataService: GetCityDataService,
    private videoDataService: VideoDataService,
  ) {
    this.getUserData('userData');
    this.getPost();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.setPostCreator();
    this.setLocationData();
  }

  setLocationData() {
    this.storageService.getItem('post')
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(val => {
        let obj = JSON.parse(val);
        this.cityDataService.getData(obj.cityName)
          .pipe(
            takeUntil(this.destroy$)
          )
          .subscribe(val => {
            this.storageService.setItem('cityData', JSON.stringify(val))
          });
      })
  }

  setPostCreator() {
    this.userDataService.users$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(val => {
        this.users = val
      }, (err) => {
        this.errorMessage = `Error: ${err}`;
      });
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((param) => {
        this.postId = param.get('postId');
      });

    if (this.postId) {
      this.postsDataService.getPost(this.postId);
      this.postsDataService.post$
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(val => {
          this.post = _.cloneDeep(val);
          this.postCreatedUser = this.users.find(user => user.id === this.post.userId);
          this.changeDetectorRef.markForCheck();
          this.loading = false;
        }, (err) => {
          this.errorMessage = `Error: ${err}`;
        })
    } else {
      console.log('Something went wrong!!!')
    }
  }

  getUserData(key: string) {
    this.storageService.getItem(key)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(val => {
        const userData = JSON.parse(val);
        if (userData) {
          this.user = _.cloneDeep(userData?.user);
          this.changeDetectorRef.markForCheck();
        } else {
          this.user = {} as User;
        }
      })
  }

  getPost() {
    this.postsDataService.post$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(val => {
        this.loading = true;
        this.post = _.cloneDeep(val);
        this.changeDetectorRef.markForCheck();
        let jsonObj = JSON.stringify(val);
        this.storageService.setItem('post', jsonObj);
        if (this.post) {
          this.loading = false;
          this.comments = this.post.comments && Object.values(this.post.comments);
          this.comments = this.comments?.map((com: any) => {
            let user = this.users.find(u => u.id === com.userId);
            return { ...com, user }
          }).sort((a: any, b: any) => b.dateOfCreate - a.dateOfCreate)
          this.tags = this.post?.tags?.split(',').map(tag => `#${tag}`);
        }
      })
  }

  onCommentClick($event: any) {
    this.isHidden = !this.isHidden;
    this.postsDataService.addComment(this.post, this.user.id, this.newComment)
    this.onStopPropogation($event);
    this, this.newComment = '';
    if (!this.user.id) {
      this.isHidden = true;
    }
  }
  onStopPropogation($event: any) {
    $event.stopPropagation();
  }

  filterUser(comment: any) {
    this.commentCreatedUser = this.users && this.users.find(user => this.user.id === comment.userId);
  }

  onEdit($event: any, post: Post) {
    $event.stopPropagation();
    this.router.navigate([`posts/edit/${post.id}`])
  }

  onDelete($event: any, post: Post) {
    $event.stopPropagation();
    this.postsDataService.removePost(this.post.id);
  }

  onLocation() {
    this.router.navigate(['/map'])
  }

  onWeatherClick() {
    this.router.navigate(['/weather'])
  }

  onVideoClick() {
    this.router.navigate(['/video'])
  }

  setVideoId() {
    this.storageService.getItem('post')
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(val => {
        let obj = JSON.parse(val);
        if (!this.post.videoId) {
          this.videoDataService.getVideoId(obj.cityName)
            .pipe(
              takeUntil(this.destroy$)
            )
            .subscribe(data => {
              let result = data.items[0].id.videoId;
              this.postsDataService.addVideoId(this.post, result);
            })
        }
      });
  }
}
