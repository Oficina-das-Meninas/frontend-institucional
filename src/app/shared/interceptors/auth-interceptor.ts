import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        (error.status === 401 || error.status === 403) &&
        !req.url.includes('/auth/login') &&
        !req.url.includes('/auth/logout') &&
        !req.url.includes('/sessions')
      ) {
        if (router.url.includes('/perfil')) {
          snackBar.open(
            'Sessão expirada ou acesso negado. Por favor, faça login novamente.',
            'Fechar',
            {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['snackbar-warning'],
            }
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
