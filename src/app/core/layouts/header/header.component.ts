import { Component, computed } from '@angular/core';
import { ESSENTIAL_ROUTES } from '../../constants/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly ESSENTIAL_ROUTES = ESSENTIAL_ROUTES;

  menuItems = computed(() => {
    return [
      {
        label: 'Home',
        routerLink: '',
      },
      {
        label: 'About Us',
        routerLink: '/about',
      },
      {
        label: 'Services',
        routerLink: '/services',
      },
      {
        label: 'Log In',
        routerLink: 'auth/login',
      },
      {
        label: 'Sing Up',
        routerLink: 'auth/signup',
      },
    ];
  });
}
