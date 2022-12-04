import { Likes } from './../models/likes';
import { PostsDataService } from 'src/app/services/posts-data/posts-data.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();
  public isAuth: boolean = false;
  public tags: string[];
  public likes: any = [];
  public isLiked: boolean = this.likes.find((item:any) => item.userId === this.user.id) === -1 ? false : true;
  public newComment:string = '';
  public comments: any = [];
  public isHidden: boolean = true;
  public allUsers: any;
  public usersIconList: any;
  public dateOfCreate: string;

@Input()
public post: Post;


@Input()
public user: User;

  constructor(
    private router: Router,
    private postsDataService: PostsDataService,
    private storageService: StorageService,
    private changeDetectorRef: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.likes = Object.values(this.post.likes);
    this.comments = Object.values(this.post.comments);
    this.tags = this.post.tags.split(',').map(tag  => `#${tag}`);
    this.dateOfCreate = this.post.dateOfCreate.split(' ').slice(1).join(' ');

    
    this.getAllUsers();
  }

  onCancelClick($event: any) {
    this.isHidden = true;
    this.onStopPropogation($event);
    this.newComment = '';
  }
  onCommentClick($event: any) {
    this.postsDataService.addComment(this.post, this.user.id, this.newComment )
    this.onStopPropogation($event);
  }
  
  onCommentIconClick($event: any) {
    this.isHidden = !this.isHidden;
    this.onStopPropogation($event);
    if(!this.user.id) {
      const parent = $event.target.parentNode;
      const wrapper = parent.closest('div');
      wrapper.firstChild.classList.toggle('show');
    }
  }
  getAllUsers() {
    this.storageService.getItem('allUsers')   
    .subscribe(val => {
      this.allUsers = val;
      this.getUserIconsList();

    })
  }
  getUserIconsList() {
    let likes = Object.values(this.post.likes);
    let result = likes.map((like: any)=> {
      return JSON.parse(this.allUsers)?.find((user: any) => user.id === like.userId);   
    })
    let userIcons = result.map((user) => {
      if(user) {
        return user.photoUrl
      }
      return;
    })
    this.usersIconList = userIcons.slice(1);
 }
  onClick(post: Post) {
    this.router.navigate([`posts/view/${post.id}`])
  }

  onEdit($event: any, post: Post) {
    $event.stopPropagation();
    this.router.navigate([`posts/edit/${post.id}`])
 }

 onDelete($event: any,post: Post) {
  $event.stopPropagation();
  this.postsDataService.removePost(this.post.id);
 }
 
 onStopPropogation($event: any) { 
  $event.stopPropagation();
 }

 onLikesClick($event: any, post: Post) {
   const parent = $event.target.parentNode;
   let newPost = {
   ...post,
   likes: [...Array.from(post.likes), {
   id: new Date().getUTCMilliseconds(),
   userId: this.user.id
  }]
}

if(this.user.id) {
  let filteredLikes = this.likes.filter((item:any) => item.userId !== this.user.id);
  let item = this.likes.find((item:any) => item.userId === this.user.id);  

    let obj: any;
    if(item && item !== -1) {
      let obj = this.toObject(filteredLikes);
      this.postsDataService.removeLikes(post, obj, this.user.id);
    } else { 
      this.postsDataService.updateLikes(newPost, this.user.id);
    }
      return;
    }
    parent.childNodes[0].classList.toggle('show');
   }

  toObject(arr: Likes[]) {
  let obj = {} as any;
  for(let i = 0; i < arr.length; i++) {
  obj[arr[i]?.userId] = arr[i]
  }
  return obj;
 }
 ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
}
