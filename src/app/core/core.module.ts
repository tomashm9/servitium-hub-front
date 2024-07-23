import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import {RouterOutlet} from "@angular/router";

@NgModule({
  declarations: [
    CoreComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    RouterOutlet,
  ]
})
export class CoreModule { }
