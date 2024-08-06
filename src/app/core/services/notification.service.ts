import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

type Severity = 'success' | 'error';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);
  private readonly translateService = inject(TranslateService);

  private show(
    summary: string,
    detail: string,
    severity: Severity,
    duration: number = 2000,
  ) {
    const translatedSummary = this.translateService.instant(summary);
    const translatedDetail = this.translateService.instant(detail);
    this.snackBar.open(`${translatedSummary}: ${translatedDetail}`, '', {
      duration: duration,
      panelClass: severity,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  showSuccess(summary: string, detail: string) {
    this.show(summary, detail, 'success');
  }

  showError(summary: string, detail: string) {
    this.show(summary, detail, 'error', 5000);
  }
}
