import { StorageService } from 'src/app/services/storage-service/storage.service';
import { ChangeDetectionStrategy, Component, Inject, HostListener } from '@angular/core';
import { Database, set, ref,  } from '@angular/fire/database';
import {  BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'firebase-crud-discovery'; 

  constructor(
    public database: Database,
    public storageService: StorageService
    ) {    
    window.addEventListener("beforeunload", function (e) {
    }, false);
  }

  registerUser(value: any) {
    set(ref(this.database, 'users/' + value.username), {
      username: value.username,
      first_name: value.first_name,
      last_name: value.last_name
    });
  }
}
