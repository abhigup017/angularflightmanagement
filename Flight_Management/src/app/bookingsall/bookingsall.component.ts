import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BookingHistory } from '../manageBookings/models/bookingHistoryModel';
import { DropdownService } from '../services/dropdown.service';
import { ManagebookingService } from '../services/managebooking.service';
import { DropdownModel } from '../sharedModels/dropdownModel';
import { AllBookedTicketsRequest } from './models/allBookedTicketsRequest';

@Component({
  selector: 'app-bookingsall',
  templateUrl: './bookingsall.component.html',
  styleUrls: ['../../styles.css']
})
export class BookingsallComponent implements OnInit {

  constructor(private _router:Router, private _dropdownService:DropdownService, private _manageBooking:ManagebookingService) { }

  ngOnInit(): void {
    this.ShowSpinner();
    forkJoin(this._dropdownService.GetLocationTypes(), this._dropdownService.GetAirlines())
    .subscribe(([locationResponse,airlinesResponse]) =>
    {
      this.BindLocations(locationResponse);
      this.BindAirlines(airlinesResponse);
      this.HideSpinner();
    });
  }
 
allBookedTicketsRequest:AllBookedTicketsRequest = new AllBookedTicketsRequest()  
showSpinner:boolean=false;
modalText:string="";
modalHeader:string="";
locations:Array<DropdownModel> = new Array<DropdownModel>();
sourceLocationSelected:any;
destinationLocationSelected:any;
airlines:Array<DropdownModel> = new Array<DropdownModel>();
airlineSelected:any;
bookingHistory:Array<BookingHistory> = new Array<BookingHistory>();
isShowNoResultFound:boolean=false;
none:any={
  id:0,
  value:"None"
};

DisplayModalPopup(modalHeader:string, modaltext:string)
{
  this.modalHeader = modalHeader;
  this.modalText=modaltext;
  document.getElementById("btnLaunchModal")?.click();
}

ShowSpinner()
{
  this.showSpinner = true;
}

HideSpinner()
{
  this.showSpinner = false;
}

BindLocations(locations:any)
{
  this.locations = locations;
  this.locations.splice(0, 0, this.none);
  this.sourceLocationSelected = locations[0];
  this.destinationLocationSelected = locations[0];
}

BindAirlines(airlines:any)
{
this.airlines = airlines;
this.airlines.splice(0, 0, this.none);
this.airlineSelected = airlines[0];
}

SearchTickets()
{
  let request = {
    airlineId: this.airlineSelected.id,
    sourceId: this.sourceLocationSelected.id,
    destinationId: this.destinationLocationSelected.id,
    travelDate: this.allBookedTicketsRequest.travelDate == "" ? null : this.allBookedTicketsRequest.travelDate
  }

  this.ShowSpinner(); 
  this._manageBooking.GetAllBookedTickets(request).subscribe(res => {this.HideSpinner(), this.BindBookingHistoryResult(res)},
  err => {this.HideSpinner(), this.DisplayModalPopup("Error", err.error)});
}

BindBookingHistoryResult(result:any)
{
  this.bookingHistory = result;
  this.isShowNoResultFound = this.bookingHistory.length == 0 ? true : false;
}

ViewTicketDetails(booking:any)
{
  let cancellationStatus = booking.isCancelled ? "Cancelled" : "Not Cancelled" 
  let modalText = "PNR Number: " + booking.pnrNumber + "\nCustomer Name: " + booking.customerName
   +"\nCustomer Email-Id: " + booking.customerEmailId
   +"\nBooked On: " + (new Date(booking.bookedOn)).toLocaleString()
   +"\nTravel Date: " + (new Date(booking.travellingDate)).toLocaleString()
   +"\nSource Location: " + booking.sourceLocation
   +"\nDestination Location: " + booking.destinationLocation
   +"\nCancellation Status: " + cancellationStatus
   +"\nMeal plan selected: " + booking.mealPlanType
   +"\n\nBooking Passenger Details";

   for(let i = 0; i < booking.bookingPassengers.length; i++)
   {
     let seatType = booking.bookingPassengers[i].isBusinessSeat ? "Business" : "Regular"
     modalText = modalText + "\n\nPassenger Name: " + booking.bookingPassengers[i].passengerName
     +"\nPassenger Age: " + booking.bookingPassengers[i].passengerAge
     +"\nPassenger Gender: " + booking.bookingPassengers[i].genderType
     +"\nSeat No: " + booking.bookingPassengers[i].seatNo
     +"\nSeat Type: " + seatType;
   }

   this.DisplayModalPopup("Ticket Details", modalText);
}

}
