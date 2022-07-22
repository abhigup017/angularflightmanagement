import { BookingsallComponent } from "../bookingsall/bookingsall.component";
import { ManagebookingsComponent } from "../manageBookings/managebookings.component";
import { AuthguardService } from "../services/authguard.service";

export const ManageBookingRoutes = [
    {path:'Manage', component:ManagebookingsComponent},
    {path:'All', canActivate:[AuthguardService], component:BookingsallComponent}
]