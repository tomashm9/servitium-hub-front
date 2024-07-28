import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MatButton } from '@angular/material/button';

@NgModule({
  declarations: [SearchBarComponent],
  imports: [CommonModule, FormsModule, MatButton],
  exports: [SearchBarComponent],
})
export class SharedModule {}
