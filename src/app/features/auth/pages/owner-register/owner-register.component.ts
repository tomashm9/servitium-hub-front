import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { FORMS } from '../../forms/register.form';
import { GENDERS } from '../../../../core/enums/gender';
import { UserType } from '../../models/user-type';

@Component({
  selector: 'app-owner-register',
  templateUrl: './owner-register.component.html',
  styleUrls: ['./owner-register.component.scss'],
})
export class OwnerRegisterComponent implements OnInit {
  form!: FormGroup;
  readonly genders = GENDERS;

  private readonly successMessage = 'Owner successfully registered';
  private readonly userType: UserType = 'owners';

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
    this.form = this.fb.group(FORMS[this.userType]);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.registerUser(this.form.value, this.userType).subscribe({
      next: () => {
        this.router.navigate(['/owner-dashboard']).then((success) => {
          if (success) {
            this.notificationService.showSuccess(
              'Welcome',
              this.successMessage,
            );
          } else {
            console.error('Navigation to owner-dashboard failed.');
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
