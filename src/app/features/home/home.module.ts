import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

import { HeroComponent } from './components/hero/hero.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ServicesComponent } from './components/services/services.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [
    HeroComponent,
    AboutUsComponent,
    ServicesComponent,
    HomePageComponent,
  ],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
