import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private baseUrl = API_ENDPOINTS.servicesByCompany;

  constructor(private http: HttpClient) {}

  getServicesByCompany(companyId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${companyId}`);
  }
}
