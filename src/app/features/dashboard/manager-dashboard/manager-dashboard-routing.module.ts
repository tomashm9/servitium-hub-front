import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerDashboardComponent } from './manager-dashboard.component';
import { ManagerGuard } from '../../../core/guards/manager.guard';

const routes: Routes = [
  {
    path: '',
    component: ManagerDashboardComponent,
    canActivate: [ManagerGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerDashboardRoutingModule {}
