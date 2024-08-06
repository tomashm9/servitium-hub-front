import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { CoreComponent } from './core.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListItem, MatNavList } from '@angular/material/list';

@NgModule({
  declarations: [CoreComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatSidenavModule,
    MatSnackBarModule,
    TranslateModule,
    FormsModule,
    NgOptimizedImage,
    MatNavList,
    MatListItem,
  ],
})
export class CoreModule {}
