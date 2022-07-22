import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }

  private _baseUrl = "https://40.124.81.77/api/1.0/flight/search";

  SearchFlights(request:any)
  {
    return this.http.post(this._baseUrl, request);
  }
}
