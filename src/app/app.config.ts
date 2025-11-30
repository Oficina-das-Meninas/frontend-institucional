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
import { lastValueFrom, of, switchMap } from 'rxjs';
import { AuthService } from './shared/services/auth/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { errorInterceptor } from './shared/interceptors/error-interceptor';

function initializeUser(authService: AuthService) {
  return () =>
    lastValueFrom(
      authService.checkSession().pipe(
        switchMap((hasSession) => {
          if (hasSession) {
            return authService.getSession();
          }
          return of(null);
        })
      )
    );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideEnvironmentNgxMask(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      })
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, errorInterceptor])
    ),

    {
      provide: APP_INITIALIZER,
      useFactory: initializeUser,
      multi: true,
      deps: [AuthService],
    },
  ],
};
