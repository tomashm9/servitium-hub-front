import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { NavSearchBarComponent } from './components/nav-search-bar/nav-search-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [SearchBarComponent, NavSearchBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButton,
    MatAnchor,
    RouterLink,
    MatSidenav,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
  ],
  exports: [SearchBarComponent, NavSearchBarComponent],
})
export class SharedModule {}
