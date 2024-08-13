import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerDashboardComponent } from './owner-dashboard.component';
import { OwnerGuard } from '../../../core/guards/owner.guard';

const routes: Routes = [
  {
    path: '',
    component: OwnerDashboardComponent,
    canActivate: [OwnerGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerDashboardRoutingModule {}
