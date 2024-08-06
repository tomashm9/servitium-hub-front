import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-invite-manager',
  templateUrl: './invite-manager.component.html',
  styleUrls: ['./invite-manager.component.scss'],
})
export class InviteManagerComponent {
  form: FormGroup;

  constructor(
    private readonly _builder: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _notificationService: NotificationService,
  ) {
    this.form = this._builder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onInvite() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this._authService.inviteManager(this.form.value.email).subscribe({
      next: () => {
        this._notificationService.showSuccess(
          'Invite Sent',
          'Manager invitation sent successfully',
        );
        this.form.reset();
      },
      error: (err) => {
        this._notificationService.showError(
          'Invite Failed',
          JSON.stringify(err.error),
        );
      },
    });
  }
}
