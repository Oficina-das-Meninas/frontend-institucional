import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth';
import { ToastService } from '../services/toast';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        (error.status === 401 || error.status === 403) &&
        !req.url.includes('/auth/login') &&
        !req.url.includes('/auth/logout') &&
        !req.url.includes('/sessions')
      ) {
        if (router.url.includes('/perfil')) {
          toastService.show(
            'Sessão expirada ou acesso negado. Por favor, faça login novamente.',
            'warning'
          );

          authService.logout().subscribe({
            complete: () => {
              authService.userName.set(null);
              router.navigate(['/login']);
            },
            error: () => {
              authService.userName.set(null);
              router.navigate(['/login']);
            },
          });
        }
      }

      return throwError(() => error);
    })
  );
};
