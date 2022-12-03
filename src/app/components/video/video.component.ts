import { Component, OnInit } from '@angular/core';
import { TwitterAuthProvider } from '@angular/fire/auth';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { VideoDataService } from 'src/app/services/video-data/video-data.service';

@Component({
    selector: 'app-video',
    template: `
 <div class="app__video-wrapper">
  <div class="app__video">
    <app-back-arrow [position]="true"></app-back-arrow>
    <youtube-player
      [width]="800"
      [height]="700"
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
    public data: any = {
        "kind": "youtube#searchListResponse",
        "etag": "6WvewVKPtphrYY_Xft1Qzf73NQU",
        "nextPageToken": "CAUQAA",
        "regionCode": "AZ",
        "pageInfo": {
            "totalResults": 1000000,
            "resultsPerPage": 5
        },
        "items": [
            {
                "kind": "youtube#searchResult",
                "etag": "JwO4c0uWKyVG8X4y5OMai6NS9Rg",
                "id": {
                    "kind": "youtube#video",
                    "videoId": "mWDUhE6NDxk"
                },
                "snippet": {
                    "publishedAt": "2021-07-30T19:00:11Z",
                    "channelId": "UCHMVJvXh_HqAwJo9Fo7BSYQ",
                    "title": "London Complete Travel Guide - England Travel Ideas - Bucket List",
                    "description": "London is an amazing city and I highly recommend that you go one time in your life. But it's a giant mega city in England, so where ...",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/mWDUhE6NDxk/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/mWDUhE6NDxk/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/mWDUhE6NDxk/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "Ultimate Bucket List",
                    "liveBroadcastContent": "none",
                    "publishTime": "2021-07-30T19:00:11Z"
                }
            },
            {
                "kind": "youtube#searchResult",
                "etag": "lXa9I67h-BoyydoHJO6lfiiTMNo",
                "id": {
                    "kind": "youtube#video",
                    "videoId": "Zdu-y8TPdZg"
                },
                "snippet": {
                    "publishedAt": "2022-04-21T19:00:09Z",
                    "channelId": "UC2n4MvLJDH2-GWzjJrC58Zw",
                    "title": "Best things to do in central London | London travel guide",
                    "description": "Traveling to London soon? Well central London is the buzziest part of the city, right in the middle with lots to do, see, and explore.",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/Zdu-y8TPdZg/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/Zdu-y8TPdZg/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/Zdu-y8TPdZg/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "Love and London",
                    "liveBroadcastContent": "none",
                    "publishTime": "2022-04-21T19:00:09Z"
                }
            },
            {
                "kind": "youtube#searchResult",
                "etag": "jaK8-lmJ0MRo0N2caD0WxRadOZU",
                "id": {
                    "kind": "youtube#video",
                    "videoId": "wpTGzMPiL8c"
                },
                "snippet": {
                    "publishedAt": "2022-08-11T19:00:19Z",
                    "channelId": "UC2n4MvLJDH2-GWzjJrC58Zw",
                    "title": "30 essential London tips in 9 minutes",
                    "description": "Visiting London for the first time? These are the 30 MUST-KNOW tips for your first time in London. We cover London tips about ...",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/wpTGzMPiL8c/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/wpTGzMPiL8c/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/wpTGzMPiL8c/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "Love and London",
                    "liveBroadcastContent": "none",
                    "publishTime": "2022-08-11T19:00:19Z"
                }
            },
            {
                "kind": "youtube#searchResult",
                "etag": "UvCH9whSq_L4Mo1FxcsvGoFc-TM",
                "id": {
                    "kind": "youtube#video",
                    "videoId": "45ETZ1xvHS0"
                },
                "snippet": {
                    "publishedAt": "2013-03-07T01:50:41Z",
                    "channelId": "UCGaOvAFinZ7BCN_FDmw74fQ",
                    "title": "London Vacation Travel Guide | Expedia",
                    "description": "Catch a glimpse of the famous London town! Or more than a glimpse – we'll show you through the whole city. When ready ...",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/45ETZ1xvHS0/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/45ETZ1xvHS0/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/45ETZ1xvHS0/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "Expedia",
                    "liveBroadcastContent": "none",
                    "publishTime": "2013-03-07T01:50:41Z"
                }
            },
            {
                "kind": "youtube#searchResult",
                "etag": "QfygbAhmKWdP0YUQdjBUUh3iIAM",
                "id": {
                    "kind": "youtube#video",
                    "videoId": "yWhRNGnV_XQ"
                },
                "snippet": {
                    "publishedAt": "2022-08-25T19:00:22Z",
                    "channelId": "UC2n4MvLJDH2-GWzjJrC58Zw",
                    "title": "15 biggest mistakes London tourists ALWAYS make 🤦🏽‍♀️",
                    "description": "Visiting London for the first time? I got ya girl. These are the biggest mistakes London tourists always make on their first visit to ...",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/yWhRNGnV_XQ/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/yWhRNGnV_XQ/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/yWhRNGnV_XQ/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "Love and London",
                    "liveBroadcastContent": "none",
                    "publishTime": "2022-08-25T19:00:22Z"
                }
            }
        ]
    }
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
        console.log('player state', event.data);
    }

}

