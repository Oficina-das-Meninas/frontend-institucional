import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth';
import { ToastService } from '../services/toast';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: any) => {
      if (error.status === 401 || error.status === 403) {
        if (req.url.includes('/auth/login')) {
          toastService.show(
            'Email ou senha inválidos. Verifique suas credenciais.',
            'error'
          );
        } else if (!req.url.includes('/auth/logout')) {
          authService.clearInvalidSession().subscribe();
        }
      } else {
        let errorMessage = 'Ocorreu um erro inesperado. Tente novamente.';

        if (
          error.error &&
          typeof error.error === 'object' &&
          error.error.message
        ) {
          errorMessage = error.error.message;
        } else if (typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.status === 0) {
          errorMessage =
            'Não foi possível conectar ao servidor. Verifique sua internet.';
        }

        setTimeout(() => {
          toastService.show(errorMessage, 'error');
        });
      }

      return throwError(() => error);
    })
  );
};
