import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }

  private _baseUrl = "https://40.124.81.77/api/1.0/booking/"

  BookFlightTicket(bookingRequest:any)
  {
    return this.http.post(this._baseUrl + bookingRequest.flightId, bookingRequest);
  }
}
