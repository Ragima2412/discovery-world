import { handleErrorMessage } from './../../utils/handleErrorMessage';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { Observable, BehaviorSubject, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class GetCityDataService {
  public location$: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  public getData(city: string): Observable<any> {
    return this.httpClient
      .get<any>(`https://api.weatherapi.com/v1/forecast.json?key=6d259c3d72e148aaae4164513220812&q=${city}&days=7&aqi=no&alerts=no`)
      .pipe(catchError(handleErrorMessage))
  }
}
