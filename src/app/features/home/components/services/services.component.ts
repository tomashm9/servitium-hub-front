import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  goToDashboard() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.authService.isOwner$.subscribe((isOwner) => {
          if (isOwner) {
            this.router.navigate(['/owner-dashboard']);
          } else {
            this.router.navigate(['/auth/login']);
          }
        });
      } else {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
