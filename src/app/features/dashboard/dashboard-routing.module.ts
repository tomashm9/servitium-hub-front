import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'client-dashboard',
    loadChildren: () =>
      import('./client-dashboard/client-dashboard.module').then(
        (m) => m.ClientDashboardModule,
      ),
  },
  {
    path: 'manager-dashboard',
    loadChildren: () =>
      import('./manager-dashboard/manager-dashboard.module').then(
        (m) => m.ManagerDashboardModule,
      ),
  },
  {
    path: 'owner-dashboard',
    loadChildren: () =>
      import('./owner-dashboard/owner-dashboard.module').then(
        (m) => m.OwnerDashboardModule,
      ),
  },
  {
    path: '',
    redirectTo: 'client-dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
