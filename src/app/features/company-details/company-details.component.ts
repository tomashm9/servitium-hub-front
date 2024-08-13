import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../dashboard/client-dashboard/services/company.service';
import {
  Company,
  CompanyLocation,
  OpeningHours,
} from '../dashboard/client-dashboard/models/company.model';
import { COMPANY_IMAGES } from '../../core/constants/company-images';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss',
})
export class CompanyDetailsComponent implements OnInit {
  company: Company = {
    id: 0,
    name: '',
    description: '',
    images: [],
    locations: [],
    openingHours: [],
  };

  location: CompanyLocation | null = null;
  openingHours: OpeningHours[] = [];

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const companyId = this.route.snapshot.paramMap.get('companyId');
    if (companyId) {
      this.companyService.getCompanyById(companyId).subscribe((data) => {
        console.log('Company data:', data);
        this.company = data;
        if (this.company.locations.length > 0) {
          this.location = this.company.locations[0];
          this.loadOpeningHours(this.location.id);
        }
        this.loadCompanyImages();
      });
    }
  }

  loadOpeningHours(locationId: number): void {
    this.companyService.getOpeningHours(locationId).subscribe((hours) => {
      this.openingHours = hours;
    });
  }

  loadCompanyImages(): void {
    if (this.company && COMPANY_IMAGES[this.company.name]) {
      const images = COMPANY_IMAGES[this.company.name];
      const basePath = 'assets/images/company-images/';
      this.company.images = images.map((image) => ({
        ...image,
        imageUrl: `${basePath}${image.imageUrl}`,
      }));
    }
  }

  bookNow(): void {
    console.log('Book Now button clicked');
    this.router.navigate(['/client-dashboard/booking'], {
      queryParams: { companyId: this.company.id },
    });
  }
}
