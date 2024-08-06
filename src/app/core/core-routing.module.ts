import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { OwnerGuard } from './guards/owner.guard';
import { ManagerGuard } from './guards/manager.guard';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../features/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('../features/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'client-dashboard',
        loadChildren: () =>
          import(
            '../features/dashboard/client-dashboard/client-dashboard.module'
          ).then((m) => m.ClientDashboardModule),
      },
      {
        path: 'owner-dashboard',
        loadChildren: () =>
          import(
            '../features/dashboard/owner-dashboard/owner-dashboard.module'
          ).then((m) => m.OwnerDashboardModule),
        canActivate: [OwnerGuard],
      },
      {
        path: 'manager-dashboard',
        loadChildren: () =>
          import(
            '../features/dashboard/manager-dashboard/manager-dashboard.module'
          ).then((m) => m.ManagerDashboardModule),
        canActivate: [ManagerGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
