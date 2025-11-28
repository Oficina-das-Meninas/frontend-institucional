import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { routes } from './app.routes';
import { authInterceptor } from './shared/interceptors/auth-interceptor';
import { UserService } from './domain/user/services/user';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './shared/services/auth/auth';

function initializeUser(authService: AuthService) {
  return () => lastValueFrom(authService.getSession());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideEnvironmentNgxMask(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      })
    ),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),

    {
      provide: APP_INITIALIZER,
      useFactory: initializeUser,
      multi: true,
      deps: [UserService],
    },
  ],
};
