import { Injectable } from '@angular/core';
import { Database, set, ref, update, onValue, remove } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { Post } from 'src/app/components/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsDataService {
  private posts: Post[] = [];
  private post: Post = {} as Post;
  public posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(
    this.posts
  );
  public post$: BehaviorSubject<Post> = new BehaviorSubject<Post>(
    this.post
  );

  constructor(
    public database: Database,
  ) {
    const starCountRef = ref(this.database, '/posts');   
     onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if(data) {
        this.posts = Object.entries(data).map(item => item[1]) as Post[];
        this.posts$.next(this.posts);        
      }
    });
  }

  public addPost(post: any) {
      set(ref(this.database,'posts/' + post.id), post )    
    this.posts$.next(this.posts);
  }
 

  public getPost(postId:string) {
  const starCountRef = ref(this.database, 'posts/' + postId);
  onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  this.post = data;
  this.post$.next(data);
});
  }

  public updatePost (post: Post) {
    update(ref(this.database, 'posts/' + post.id), { 
      ...post,
      likes: post.likes
    });
 
  }

  public addVideoId(post: Post, videoId: string) {
    console.log('addVideoId', post, videoId)
    update(ref(this.database, 'posts/' + post.id), { 
      ...post,
       videoId: videoId
    });
  }

  public removePost(postId: number) {
    remove(ref(this.database, 'posts/' + postId)); 
  }

  public updateLikes(post: Post, userId: number) {
    let likeId= new Date().getUTCMilliseconds();
    update(ref(this.database, 'posts/' + post.id + '/likes'), { 
      [userId]: {  
      id: likeId,
      userId} 
    });
  }

  public removeLikes(post: Post, likes: any, userId: number) {
    remove(ref(this.database, 'posts/' + post.id + '/likes/' + userId));
  }

  public addComment(post: Post, userId: number, newComment: string) {
    let commentId= new Date().getUTCMilliseconds();
    let dateOfCreate = new Date().toString();
    update(ref(this.database, 'posts/' + post.id + '/comments'), {
      [commentId]: {  
      id: commentId,
      userId,
      dateOfCreate: dateOfCreate,
      text: newComment} 
    });
  }
}
