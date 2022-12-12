import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { VideoDataService } from 'src/app/services/video-data/video-data.service';

@Component({
    selector: 'app-video',
    template: `
 <div class="app__video-wrapper">
  <div class="app__video">
    <youtube-player
      [width]="1600"
      [height]="800"
      [videoId]="id"
      (ready)="savePlayer($event)"
      (change)="onStateChange($event)"
    ></youtube-player>
  </div>
    </div> 
  `,
    styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

    player: YT.Player;
    public id: string;
    public width: string;
    public height: string;
  
    constructor(
        private videoDataService: VideoDataService,
        private storageService: StorageService) {

    }

    ngOnInit(): void {
        this.setVideoId();
    }

    setVideoId() {
        this.storageService.getItem('post').subscribe(val => {
            let obj = JSON.parse(val);
            this.id = obj.videoId;
        })
    }

    savePlayer(player: any) {
        this.player = player;
        console.log('player instance', player);
    }
    onStateChange(event: any) {
    }
}
