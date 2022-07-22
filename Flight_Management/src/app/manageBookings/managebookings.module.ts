import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagebookingsComponent } from './managebookings.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ManageBookingRoutes } from '../routes/manageBookingRoutes';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { BookingsallComponent } from '../bookingsall/bookingsall.component';



@NgModule({
  declarations: [
    ManagebookingsComponent,
    BookingsallComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,FormsModule,
    RouterModule.forChild(ManageBookingRoutes)
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
})
export class ManagebookingsModule { }
