import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  searchQuery: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  onSearch(): void {
    const trimmedQuery = this.searchQuery.trim();

    if (this.isValidLocation(trimmedQuery)) {
      this.router
        .navigate(['/client-dashboard'], {
          queryParams: { search: trimmedQuery },
        })
        .then(() => {
          this.searchQuery = '';
          this.errorMessage = null;
        })
        .catch((error) => {
          console.error('Error during navigation:', error);
        });
    } else {
      this.errorMessage = 'Please enter a valid Country, City, or Postal Code.';
    }
  }

  isValidLocation(query: string): boolean {
    return query.length > 0;
  }
}
