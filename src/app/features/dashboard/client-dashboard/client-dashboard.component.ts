import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { COMPANY_IMAGES } from '../../../core/constants/company-images';
import { Company } from './models/company.model';
import { CompanyService } from './services/company.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss',
})
export class ClientDashboardComponent implements OnInit {
  companies: Company[] = [];
  searchQuery: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchQuery = params['search'] || '';
      this.loadCompanies();
    });
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe({
      next: (companies) => {
        this.companies = companies.map((company) => ({
          ...company,
          images: COMPANY_IMAGES[company.name] || [],
        }));
      },
      error: (error) => {
        console.error('Error fetching companies:', error);
      },
      complete: () => {
        console.log('Companies fetch complete');
      },
    });
  }

  getImageUrl(company: Company): string {
    if (company.images && company.images.length > 0) {
      return `assets/images/company-images/${company.images[0].imageUrl}`;
    }
    return 'assets/images/company-images/default-image.png';
  }

  navigateToDetails(companyId: number): void {
    this.router.navigate([`/company-details/${companyId.toString()}`]);
  }
}
