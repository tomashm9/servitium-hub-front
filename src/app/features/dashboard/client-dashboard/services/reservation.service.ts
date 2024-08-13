import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private baseUrl = API_ENDPOINTS.reservations;

  constructor(private http: HttpClient) {}

  addReservation(reservation: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, reservation);
  }
}
