import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDetailsComponent } from './company-details.component';
import { CompanyService } from '../dashboard/client-dashboard/services/company.service';
import { CompanyRoutingModule } from './company-routing.module';

@NgModule({
  declarations: [CompanyDetailsComponent],
  imports: [CommonModule, CompanyRoutingModule],
  providers: [CompanyService],
})
export class CompanyDetailsModule {}
