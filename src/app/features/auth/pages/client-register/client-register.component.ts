import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { FORMS } from '../../forms/register.form';
import { GENDERS } from '../../../../core/enums/gender';
import { UserType } from '../../models/user-type';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.scss',
})
export class ClientRegisterComponent implements OnInit {
  form!: FormGroup;
  readonly genders = GENDERS;

  private readonly successMessage = 'Client successfully registered';
  private readonly userType: UserType = 'clients';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group(FORMS[this.userType], {
      validators: this.passwordsMatch,
    } as AbstractControlOptions); // Use AbstractControlOptions here
  }

  private passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.registerUser(this.form.value, this.userType).subscribe({
      next: () => {
        this.router.navigate(['/client-dashboard']).then((success) => {
          if (success) {
            this.notificationService.showSuccess(
              'Welcome',
              this.successMessage,
            );
          } else {
            console.error('Navigation to client-dashboard failed.');
          }
        });
      },
      error: (err) => {
        this.notificationService.showError(
          'Error signing up',
          `Error: ${err.error.message || 'Unknown error'}`,
        );
      },
    });
  }
}
