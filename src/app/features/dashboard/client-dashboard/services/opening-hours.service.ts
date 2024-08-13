import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class OpeningHoursService {
  private baseUrl = API_ENDPOINTS.availableHours;

  constructor(private http: HttpClient) {}

  getOpeningHoursByCompanyLocation(
    companyLocationId: number,
  ): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${companyLocationId}`);
  }
}
