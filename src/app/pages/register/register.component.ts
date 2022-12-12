import {  Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { iconsUrl } from 'src/assets/iconsUrl';
import { Database, set, ref } from '@angular/fire/database';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

 public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public database: Database,
    private router: Router,
    private storageService: StorageService
  ) { 
    this.registerForm = this.fb.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
   }

  ngOnInit(): void {}

  onRegister(){
    const registerObj = this.registerForm.value;
    const newUser = {
      id: new Date().getUTCMilliseconds(),
      ...this.registerForm.value,
     photo: iconsUrl[Math.floor(Math.random()*6 + 1)]
    };

    set(ref(this.database, 'users/' + newUser.firstname), {  
      id: newUser.id,                       //   POST
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      photoUrl: newUser.photo,
      email: newUser.email,
      password: newUser.password
    });    
    this.router.navigate(['/posts']);
    let userData = JSON.stringify({ user: newUser, isAuth: true});
    this.storageService.setItem('userData', userData);
    this.registerForm.reset({
      firstname: '',
      lastname:'',
      email: '',
      password: '',
    });
  }
}
