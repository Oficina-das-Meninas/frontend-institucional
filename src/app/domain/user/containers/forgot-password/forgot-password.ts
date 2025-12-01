import { Component, inject, signal } from '@angular/core';
import { Logo } from '../../../../shared/components/logo/logo';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormHelperService } from '../../../../shared/services/form/form-helper-service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';
import { AuthService } from '../../../../shared/services/auth/auth';

@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    Logo,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatSnackBarModule,
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  form!: FormGroup;
  formHelper = inject(FormHelperService);
  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  loadingRequest = signal(false);
  emailSent = signal(false);

  constructor() {
    this.form = new FormGroup({
      email: new FormControl<string>(null!, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loadingRequest.set(true);
    const { email } = this.form.getRawValue();

    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.emailSent.set(true);
        this.snackBar.open(
          'E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada.',
          'Fechar',
          {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snackbar-success'],
          }
        );
      },
      error: (err: unknown) => {
        let message = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';

        if (err instanceof Object && 'status' in err) {
          const status = (err as Record<string, unknown>)['status'];
          if (status === 404) {
            message = 'E-mail não encontrado.';
          } else if (status === 400) {
            message = 'E-mail inválido. Verifique e tente novamente.';
          } else if (status === 401) {
            message = 'Erro de autenticação. Tente novamente mais tarde.';
          }
        }

        this.snackBar.open(message, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-error'],
        });

        this.loadingRequest.set(false);
      },
    });
  }

  goBackToLogin() {
    this.router.navigate(['/login']);
  }
}
