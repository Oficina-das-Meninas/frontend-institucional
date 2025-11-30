import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
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

      return throwError(() => error);
    })
  );
};
