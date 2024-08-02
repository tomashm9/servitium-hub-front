import { Validators } from '@angular/forms';

export interface IRegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  contactEmail: string;
  gender: string;
  birthDate: string;
}

const REGISTER_FORM = {
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required]],
  firstName: ['', [Validators.required]],
  lastName: ['', [Validators.required]],
  phoneNumber: ['', [Validators.required]],
  contactEmail: ['', [Validators.required]],
  gender: ['', [Validators.required]],
  birthDate: ['', [Validators.required]],
};

export const FORMS = {
  clients: REGISTER_FORM,
  owners: REGISTER_FORM,
};
