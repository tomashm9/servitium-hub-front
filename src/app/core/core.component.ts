import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './services/sidenav.service';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isLoggedIn$: Observable<boolean>;

  constructor(
    private sidenavService: SidenavService,
    public authService: AuthService,
    private notificationService: NotificationService,
  ) {
    this.sidenavService.sidenavToggle$.subscribe(() => {
      this.sidenav
        .toggle()
        .then(() => {
          console.log('Sidenav toggled');
        })
        .catch((error) => {
          console.error('Error toggling sidenav:', error);
        });
    });
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  logout() {
    this.authService.logout();
    this.notificationService.showSuccess('Successfully', 'Logged out!');
    this.sidenav
      .close()
      .then(() => {
        console.log('Sidenav closed successfully');
      })
      .catch((error) => {
        console.error('Error closing sidenav:', error);
      });
  }
}
