import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LOGIN_FORM } from '../../forms/login.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  form: FormGroup;

  constructor(builder: FormBuilder) {
    this.form = builder.group(LOGIN_FORM);
  }

  onSubmit() {
    this.authService.login(this.form.value).subscribe({
      next: (_) => {
        this.notificationService.showSuccess('Successfully', 'Logged in');
      },
      error: (err) => {
        this.notificationService.showError(
          'Unable to log in',
          JSON.stringify(err.error),
        );
      },
    });
  }
}
