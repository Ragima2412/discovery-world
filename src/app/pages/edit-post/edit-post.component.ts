import { PostsDataService } from 'src/app/services/posts-data/posts-data.service';
import { Post } from 'src/app/components/models/post';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
const _ = require("lodash"); 

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPostComponent implements OnInit {

  public editForm: FormGroup;
  public base64Output : string;
  public isLoading: boolean = false;
  public errorMessage: string | null = null;
  public postId: string | null = null;
  public post: Post = {} as Post;

  constructor(
    private fb: FormBuilder,
    public database: Database,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postsDataService: PostsDataService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.editForm = this.fb.group({
      cityName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
      photoUrl: new FormControl(''),
    })      
  }  
  
  
  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe((param) => {
      this.postId = param.get('postId');
    })
    if(this.postId) {
      this.postsDataService.getPost(this.postId);
      this.postsDataService.post$
      .subscribe(val => {
       this.post = _.cloneDeep(val);
       this.changeDetectorRef.markForCheck();
       this.isLoading = false;
      }, (err) => {
       this.errorMessage = `Error: ${err}`;
      })
     } else {
       console.log('Something went wrong!!!')
     }
  }

  onFileSelected(event: any ) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output = base64;
    });
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  onSubmit() {
    const formValue = this.editForm.value;
    const editPost = {
      ...this.post,
      dateOfUpdate: new Date().toString(),
      photo: this.base64Output || this.post.photo,
      cityName: formValue.cityName,
      description: formValue.description,
      tags: formValue.tags 
    }
    this.postsDataService.updatePost(editPost);
    this.router.navigate(['/posts'])
  }
  onPhotoLoading() {
   this.isLoading = true;
   if(this.base64Output) {
    this.isLoading = false;
   }
  }
}
