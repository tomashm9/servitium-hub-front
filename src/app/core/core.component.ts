import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './services/sidenav.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
})
export class CoreComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private sidenavService: SidenavService) {
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
  }
}
