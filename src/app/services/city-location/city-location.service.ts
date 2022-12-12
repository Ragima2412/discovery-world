import { StorageService } from './../storage-service/storage.service';
import { BehaviorSubject } from 'rxjs';
import { GetCityDataService } from 'src/app/services/get-city-data/get-city-data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class CityLocationService{
  public cityName: string = '';
  private location: any = {}; 
  private weather: any = {};
 
  public weather$: BehaviorSubject<any> = new BehaviorSubject<any>(this.weather);
  public location$: BehaviorSubject<any> = new BehaviorSubject<any>(this.location)

  constructor(private getCityDataService: GetCityDataService, 
    private storageService: StorageService
    ) {
    this.getCityDataService
    .location$
    .subscribe((data: any) => {
      this.location = data;
      this.location$.next(this.location);
    })
   }
}
