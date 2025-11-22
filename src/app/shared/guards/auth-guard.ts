import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { UserService } from '../../domain/user/services/user';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(UserService);

  const isLoginPage = state.url.includes('/login');

  return authService.getSession().pipe(
    map((response) => {
      const user = response?.data?.username;

      if (user) {
        if (isLoginPage) {
          return router.parseUrl('/');
        }
        return true;
      }

      if (isLoginPage) {
        return true;
      }

      return router.parseUrl('/login');
    }),
    catchError(() => {
      if (isLoginPage) {
        return of(true);
      }

      return of(router.parseUrl('/login'));
    })
  );
};
