import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from './cookie.service';
import { IAuth } from '../../features/auth/models/auth.model';
import { ILoginForm } from '../../features/auth/forms/login.form';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import {
  IRegisterForm,
  IRegisterManagerForm,
  IRegisterOwnerForm,
} from '../../features/auth/forms/register.form';
import { COMMON } from '../constants/common';
import { ROLES } from '../constants/roles';
import { Router } from '@angular/router';
import { UserType } from '../../features/auth/models/user-type';

@Injectable()
export class AuthService {
  private _currentUser$ = new BehaviorSubject<IAuth | null>(null);

  constructor(
    private readonly _cookieService: CookieService,
    private readonly _httpClient: HttpClient,
    private readonly _router: Router,
  ) {
    this.loadUser();
  }

  get currentUser$(): Observable<IAuth | null> {
    return this._currentUser$.asObservable();
  }

  getCurrentUserRoles(): string[] {
    return this.currentUser?.roles || [];
  }

  get isOwner(): boolean {
    return this.getCurrentUserRoles().includes(ROLES.OWNER);
  }

  get isManager(): boolean {
    return this.getCurrentUserRoles().includes(ROLES.MANAGER);
  }

  get isClient(): boolean {
    return this.getCurrentUserRoles().includes(ROLES.CLIENT);
  }

  get currentUser(): IAuth | null {
    return this._currentUser$.value;
  }

  get userId(): number | null {
    return this.currentUser?.user.id || null;
  }

  get isLoggedIn$(): Observable<boolean> {
    return this._currentUser$.pipe(map((auth) => !!auth));
  }

  get isOwner$(): Observable<boolean> {
    return this._currentUser$.pipe(
      map((auth) => !!auth?.roles.includes(ROLES.OWNER)),
    );
  }

  get isManager$(): Observable<boolean> {
    return this._currentUser$.pipe(
      map((auth) => !!auth?.roles.includes(ROLES.MANAGER)),
    );
  }

  get isClient$(): Observable<boolean> {
    return this._currentUser$.pipe(
      map((auth) => !!auth?.roles.includes(ROLES.CLIENT)),
    );
  }

  get token(): string | null {
    return this.currentUser?.accessToken || null;
  }

  set currentUser(auth: IAuth | null) {
    if (auth) {
      this._cookieService.set(
        COMMON.user.cookieName,
        btoa(JSON.stringify(auth)),
      );
    } else {
      this._cookieService.delete(COMMON.user.cookieName);
    }

    this._currentUser$.next(auth);
  }

  login(form: ILoginForm) {
    return this._httpClient.post<IAuth>(`${API_ENDPOINTS.login}`, form).pipe(
      tap((auth) => {
        console.log('Login response:', auth);
        this.currentUser = auth;
        this.redirectUserBasedOnRole();
      }),
    );
  }

  private redirectUserBasedOnRole() {
    const roles = this.getCurrentUserRoles();
    console.log('Current user roles:', roles);

    let navigateTo = '';
    if (roles.includes(ROLES.OWNER)) {
      navigateTo = '/owner-dashboard';
    } else if (roles.includes(ROLES.MANAGER)) {
      navigateTo = '/manager-dashboard';
    } else if (roles.includes(ROLES.CLIENT)) {
      navigateTo = '/client-dashboard';
    } else {
      navigateTo = '/';
    }

    console.log('Navigating to:', navigateTo);
    this._router.navigate([navigateTo]).then(
      (success) => {
        if (success) {
          console.log(`Navigation to ${navigateTo} was successful!`);
        } else {
          console.error(`Navigation to ${navigateTo} failed!`);
        }
      },
      (error) => {
        console.error(
          `Navigation to ${navigateTo} encountered an error:`,
          error,
        );
      },
    );
  }

  registerUser(
    form: IRegisterForm | IRegisterOwnerForm | IRegisterManagerForm,
    userType: UserType,
  ) {
    return this._httpClient
      .post<IAuth>(`${API_ENDPOINTS.register[userType]}`, form)
      .pipe(tap((auth) => (this.currentUser = auth)));
  }

  inviteManager(email: string) {
    return this._httpClient.post<void>(`${API_ENDPOINTS.inviteManager}`, {
      email,
    });
  }

  logout() {
    this.currentUser = null;
    this._router.navigate(['/']).then(
      (success) => {
        if (success) {
          console.log('Redirected to the homepage after logout.');
        } else {
          console.error('Failed to redirect to the homepage after logout.');
        }
      },
      (error) => {
        console.error(
          'Error occurred while redirecting to the homepage after logout:',
          error,
        );
      },
    );
  }

  loadUser() {
    const userCookie = this._cookieService.get(COMMON.user.cookieName);

    if (userCookie) {
      this.currentUser = JSON.parse(atob(userCookie));
      console.log('Loaded user from cookie:', this.currentUser);
    }
  }
}
