import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { HeroComponent } from './components/hero/hero.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ServicesComponent } from './components/services/services.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MatButton } from '@angular/material/button';

@NgModule({
  declarations: [
    HeroComponent,
    AboutUsComponent,
    ServicesComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatButton,
    SharedModule,
  ],
})
export class HomeModule {}
