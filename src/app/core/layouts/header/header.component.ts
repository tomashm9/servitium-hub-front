import { Component, computed, inject } from '@angular/core';
import { ESSENTIAL_ROUTES } from '../../constants/routes';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  protected readonly ESSENTIAL_ROUTES = ESSENTIAL_ROUTES;

  isLoggedIn = toSignal(this.authService.isLoggedIn$);

  centerMenuItems = toObservable(
    computed(() => {
      const isLoggedIn = this.isLoggedIn();

      return [
        {
          label: 'Home',
          routerLink: 'hero',
          visible: !isLoggedIn,
        },
        {
          label: 'About Us',
          routerLink: 'about-us',
          visible: !isLoggedIn,
        },
        {
          label: 'Services',
          routerLink: 'services',
          visible: !isLoggedIn,
        },
      ].filter((item) => item.visible);
    }),
  );

  rightMenuItems = toObservable(
    computed(() => {
      const isLoggedIn = this.isLoggedIn();

      return [
        {
          label: 'Log In',
          routerLink: '/auth/login',
          visible: !isLoggedIn,
        },
        {
          label: 'Sign Up',
          routerLink: '/auth/signup/clients',
          visible: !isLoggedIn,
        },
      ].filter((item) => item.visible);
    }),
  );

  constructor(
    private router: Router,
    private sidenavService: SidenavService,
  ) {}

  scrollTo(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(['/']).then(() => {
        const newElement = document.getElementById(section);
        if (newElement) {
          newElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  toggleSidenav() {
    this.sidenavService.toggleSidenav();
  }
}
