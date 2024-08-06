import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  HttpBackend,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

import { AppComponent } from './app.component';
import { COMMON } from './core/constants/common';
import { AuthService } from './core/services/auth.service';
import { GlobalErrorHandler } from './core/handlers/global-error.handler';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { baseInterceptor } from './core/interceptors/base.interceptor';

const httpTranslateLoader = (http: HttpBackend) => {
  return new MultiTranslateHttpLoader(http, [
    { prefix: COMMON.i18n.path, suffix: COMMON.i18n.extension },
  ]);
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpBackend],
      },
    }),
  ],
  providers: [
    AuthService,
    provideHttpClient(withInterceptors([baseInterceptor, jwtInterceptor])),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
