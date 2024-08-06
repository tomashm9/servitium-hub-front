import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { LoginComponent } from './pages/login/login.component';
import { ClientRegisterComponent } from './pages/client-register/client-register.component';
import { InviteManagerComponent } from './pages/invite-manager/invite-manager.component';
import { OwnerRegisterComponent } from './pages/owner-register/owner-register.component';

@NgModule({
  declarations: [
    LoginComponent,
    ClientRegisterComponent,
    InviteManagerComponent,
    OwnerRegisterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AuthRoutingModule,
    MatSelectModule,
  ],
})
export class AuthModule {}
