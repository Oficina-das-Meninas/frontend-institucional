import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { UserService } from '../../domain/user/services/user';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(UserService);

  const publicOnlyRoutes = ['/login', '/cadastro', '/esqueci-senha', '/alterar-senha'];

  const isPublicAuthRoute = publicOnlyRoutes.some((path) =>
    state.url.includes(path)
  );

  return authService.getSession().pipe(
    map((response) => {
      const user = response?.data?.username;

      if (user) {
        if (isPublicAuthRoute) {
          return router.parseUrl('/');
        }
        return true;
      }

      if (isPublicAuthRoute) {
        return true;
      }

      return router.parseUrl('/login');
    }),
    catchError(() => {
      if (isPublicAuthRoute) {
        return of(true);
      }
      return of(router.parseUrl('/login'));
    })
  );
};
