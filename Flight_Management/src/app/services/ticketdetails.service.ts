import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketdetailsService {

  constructor(private http:HttpClient) { }

  private _baseUrl = "https://40.124.81.77/api/1.0/ticket/search/"

  GetTicketHistory(pnrNumber:string)
  {
    return this.http.get(this._baseUrl + pnrNumber);
  }
}
