import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { StorageService } from 'src/app/services/storage-service/storage.service';
const _ = require("lodash"); 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isAuth: boolean = false;
  public user: any = '';
  private destroy$: Subject<void> = new Subject<void>();
  constructor( 
    private storageService: StorageService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    
    ) {
      this.storageService.getItem('userData')
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(val => {
        const userData = JSON.parse(val);
        if(userData) {
          this.user = _.cloneDeep(userData?.user); 
          this.isAuth = _.cloneDeep(userData?.isAuth);
          this.changeDetectorRef.markForCheck();           
        } else {  
          this.isAuth = false;
          this.user = {} as User;
        }
       })     
   }

  ngOnInit(): void {
    this.storageService.getItem('userData')
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(val => {
      if(val) {    
        const userData = JSON.parse(val);        
        this.user = userData?.user;
        this.isAuth = userData?.isAuth;
      } else {
        this.isAuth = false;
        this.user = {} as User;
      }
     })   
  }  
  onLogout() {   
    this.storageService.clear();
  }  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
