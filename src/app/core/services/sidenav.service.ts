import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private sidenavToggleSubject = new Subject<void>();

  sidenavToggle$ = this.sidenavToggleSubject.asObservable();

  toggleSidenav() {
    this.sidenavToggleSubject.next();
  }
}
