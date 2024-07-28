import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
      routerLink: 'hero',
    },
    {
      label: 'About Us',
      routerLink: 'about-us',
    },
    {
      label: 'Services',
      routerLink: 'services',
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

  constructor(private router: Router) {}

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
}
