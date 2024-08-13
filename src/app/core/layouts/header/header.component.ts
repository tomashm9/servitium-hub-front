import { Component, computed, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private _showSearchBar: boolean = false;
  mobileMenuOpen = false;

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

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._showSearchBar = this.router.url.includes('/client-dashboard');
      }
    });
  }

  get showSearchBar(): boolean {
    return this._showSearchBar;
  }

  get logoRouterLink(): string {
    return this.isLoggedIn() ? '/client-dashboard' : '/';
  }

  scrollTo(section: string): void {
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        this.scrollToSection(section);
      });
    } else {
      this.scrollToSection(section);
    }
  }

  private scrollToSection(section: string): void {
    if (section === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    const element = document.getElementById(section);
    if (element) {
      const yOffset = -this.getNavbarHeight();
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }
  }

  private getNavbarHeight(): number {
    const navbar = document.querySelector('mat-toolbar');
    return navbar ? navbar.clientHeight : 0;
  }

  toggleSidenav() {
    this.sidenavService.toggleSidenav();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
