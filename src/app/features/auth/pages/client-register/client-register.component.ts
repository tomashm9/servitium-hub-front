import { Component, effect, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FORMS } from '../../forms/register.form';
import { GENDERS } from '../../../../core/enums/gender';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification.service';

export type UserType = 'clients' | 'owners' | 'managers';

export interface IUserTypeDetails {
  type: UserType;
  message: string;
  form: any;
}

const MESSAGES = {
  clients: 'Client successfully registered',
  owners: 'Owner successfully registered',
  managers: 'Manager successfully registered',
};

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.scss',
})
export class ClientRegisterComponent {
  form: FormGroup;
  userType = signal<UserType>('clients');
  userTypeDetails: IUserTypeDetails;

  protected genders = GENDERS;

  constructor(
    private readonly _builder: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _routerService: Router,
    private readonly _notificationService: NotificationService,
  ) {
    this.userTypeDetails = {
      type: this.userType(),
      message: MESSAGES[this.userType()],
      form: FORMS[this.userType()],
    };

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
            'Welcome',
            'Signed up successfully',
          );
        },
        error: (err) => {
          this._notificationService.showError(
            'Error signing up',
            JSON.stringify(err.error),
          );
        },
      });
  }
}
