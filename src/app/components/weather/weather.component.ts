import { StorageService } from './../../services/storage-service/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  public weatherData: any;
  public currentWeather: any;
  public location: any;
  public celcMark = String.fromCodePoint(8451);
  
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.getData();
    console.log(this.weatherData, this.location,this.currentWeather)
  }

getData() {
  let weekDays = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
 this.storageService.getItem('cityData').subscribe(val => { 
  let data = JSON.parse(val);
  this.weatherData = data.forecast.forecastday;
  this.currentWeather = data.current;
  this.location = data.location;
 })
}

}
