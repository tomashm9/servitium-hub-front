import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Company, OpeningHours } from '../models/company.model';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseUrl = `${API_ENDPOINTS.companies}`;
  private openingHoursUrl = `${API_ENDPOINTS.openingHours}`;

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    console.log('Request URL:', this.baseUrl);
    return this.http.get<Company[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('Error fetching companies:', error);
        return throwError(() => new Error('Failed to fetch companies'));
      }),
    );
  }

  getCompanyById(id: string | null): Observable<Company> {
    if (id) {
      return this.http.get<Company>(`${this.baseUrl}/${id}`).pipe(
        catchError((error) => {
          console.error('Error fetching company by ID:', error);
          return throwError(() => new Error('Failed to fetch company'));
        }),
      );
    }
    return throwError(() => new Error('Company ID is null'));
  }

  getOpeningHours(companyLocationId: number): Observable<OpeningHours[]> {
    const url = this.openingHoursUrl.replace(
      '{companyLocationId}',
      companyLocationId.toString(),
    );
    return this.http.get<OpeningHours[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching opening hours:', error);
        return throwError(() => new Error('Failed to fetch opening hours'));
      }),
    );
  }
}
