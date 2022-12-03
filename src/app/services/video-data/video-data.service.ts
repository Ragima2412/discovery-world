import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { handleErrorMessage } from 'src/app/utils/handleErrorMessage';

@Injectable({
  providedIn: 'root'
})
export class VideoDataService {
  private APIkey: string = 'AIzaSyDSRf2S-9-OI3eNo4EUnUVhkXXUTQSnGx4'
  constructor(private httpClient: HttpClient) { }
  
  public getVideoId(query: string): Observable<any> {
   return this.httpClient
   .get<any>(`https://www.googleapis.com/youtube/v3/search?key=${this.APIkey}&q=travel ${query}&type=video&part=snippet`)
   .pipe(catchError(handleErrorMessage))
  }
}
