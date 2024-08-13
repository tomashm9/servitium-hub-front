import { Validators } from '@angular/forms';

export interface IRegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  contactEmail: string;
  gender: string;
  birthDate: string;
}

export interface IRegisterOwnerForm extends IRegisterForm {}

export interface IRegisterManagerForm extends IRegisterForm {}

const CLIENT_REGISTER_FORM = {
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required]],
  confirmPassword: ['', [Validators.required]],
  firstName: ['', [Validators.required]],
  lastName: ['', [Validators.required]],
  phoneNumber: ['', [Validators.required]],
  contactEmail: ['', [Validators.required]],
  gender: ['', [Validators.required]],
  birthDate: ['', [Validators.required]],
};

const OWNER_REGISTER_FORM = {
  ...CLIENT_REGISTER_FORM,
};

const MANAGER_REGISTER_FORM = {
  ...CLIENT_REGISTER_FORM,
};

export const FORMS = {
  clients: CLIENT_REGISTER_FORM,
  owners: OWNER_REGISTER_FORM,
  managers: MANAGER_REGISTER_FORM,
};
