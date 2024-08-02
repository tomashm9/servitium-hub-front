import { Component, effect, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FORMS } from '../../forms/register.form';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification.service';

export type UserType = 'clients' | 'owners';

export interface IUserTypeDetails {
  type: UserType;
  message: string;
  form: any;
}

const MESSAGES = {
  clients: 'auth.signup.client.message',
  owners: 'auth.signup.owner.message',
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  protected form: FormGroup;

  protected userType = signal<UserType>('clients');

  protected userTypeDetails: IUserTypeDetails = {
    type: this.userType(),
    message: MESSAGES[this.userType()],
    form: FORMS[this.userType()],
  };

  constructor(
    private readonly _builder: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _routerService: Router,
    private readonly _notificationService: NotificationService,
  ) {
    this.form = this._builder.group(this.userTypeDetails.form);

    effect(() => {
      const type = this.userType();

      this.userTypeDetails = {
        type,
        message: MESSAGES[type],
        form: FORMS[type],
      };

      this.form = this._builder.group(this.userTypeDetails.form);
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this._authService
      .registerUser(this.form.value, this.userTypeDetails.type)
      .subscribe({
        next: (_) => {
          this._routerService.navigate(['/']).then();

          this._notificationService.showSuccess(
            'auth.register.success.summary',
            'auth.register.success.detail',
          );
        },
        error: (err) => {
          this._notificationService.showError(
            'auth.register.error.summary',
            JSON.stringify(err.error),
          );
        },
      });
  }
}
