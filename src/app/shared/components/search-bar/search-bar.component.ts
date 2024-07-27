import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  searchQuery: string = '';

  constructor(private router: Router) {}

  onSearch(): void {
    const trimmedQuery = this.searchQuery.trim();
    if (trimmedQuery) {
      this.router
        .navigate(['/client-dashboard'], {
          queryParams: { search: trimmedQuery },
        })
        .then(() => {
          this.searchQuery = '';
        })
        .catch((error) => {
          console.error('Error during navigation:', error);
        });
    } else {
      this.router.navigate(['/client-dashboard']).catch((error) => {
        console.error('Error during navigation:', error);
      });
    }
  }
}
