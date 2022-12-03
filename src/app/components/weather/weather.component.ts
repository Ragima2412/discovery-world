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
  }

getData() {
  let weekDays = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
 this.storageService.getItem('cityData').subscribe(val => {
  let data = JSON.parse(val);
  let days = weekDays.map((item, index) => {
    data.forecast.forecastday[index].weekday = item;
  return data.forecast.forecastday[index]})
  this.weatherData = days;

  this.currentWeather = data.current;
  this.location = data.location;
 })
}

}
