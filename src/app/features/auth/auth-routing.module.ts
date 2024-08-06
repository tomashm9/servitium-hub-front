import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ClientRegisterComponent } from './pages/client-register/client-register.component';
import { InviteManagerComponent } from './pages/invite-manager/invite-manager.component';
import { OwnerRegisterComponent } from './pages/owner-register/owner-register.component';
import { GuestGuard } from '../../core/guards/guest.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'signup/clients',
    component: ClientRegisterComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'signup/owners',
    component: OwnerRegisterComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'invite-manager',
    component: InviteManagerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
