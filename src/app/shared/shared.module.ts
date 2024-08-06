import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButton,
    MatAnchor,
    RouterLink,
    MatSidenav,
  ],
  exports: [SearchBarComponent],
})
export class SharedModule {}
