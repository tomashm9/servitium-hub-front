import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  logoItem = {
    home: {
      url: '/',
      label: 'Servitium Hub',
    },
  };

  centerMenuItems = [
    {
      label: 'Home',
      routerLink: '',
      scrollTo: 'hero',
    },
    {
      label: 'About Us',
      routerLink: '',
      scrollTo: 'about-us',
    },
    {
      label: 'Services',
      routerLink: '',
      scrollTo: 'services',
    },
  ];

  rightMenuItems = [
    {
      label: 'Log In',
      routerLink: 'auth/login',
    },
    {
      label: 'Sign Up',
      routerLink: 'auth/signup',
    },
  ];

  scrollTo(anchor: string): void {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
