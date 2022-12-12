import { StorageService } from './../../services/storage-service/storage.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common'
declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  public lat: number;
  public lng: number;

  map: any;
  @ViewChild('mapElement') mapElement: any;

  constructor(
    private storageService: StorageService,
    private location: Location) { }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: this.lat, lng: this.lng },
      zoom: 8,
    })
  }

  onClick() {
    window.history.back();
  }

  getData() {
    this.storageService.getItem('cityData').subscribe(val => {
      let data = JSON.parse(val);
      this.lat = data.location.lat;
      this.lng = data.location.lon;
    })
  }
}
