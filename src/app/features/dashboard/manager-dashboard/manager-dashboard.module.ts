import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerDashboardComponent } from './manager-dashboard.component';
import { ManagerDashboardRoutingModule } from './manager-dashboard-routing.module';

@NgModule({
  declarations: [ManagerDashboardComponent],
  imports: [CommonModule, ManagerDashboardRoutingModule],
})
export class ManagerDashboardModule {}
