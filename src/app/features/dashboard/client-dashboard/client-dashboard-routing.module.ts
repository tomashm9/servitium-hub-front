import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  {
    path: '',
    component: ClientDashboardComponent,
  },
  {
    path: 'booking',
    component: BookingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientDashboardRoutingModule {}
