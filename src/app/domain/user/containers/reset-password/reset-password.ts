import { Component, inject, OnInit, signal } from '@angular/core';
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
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormHelperService } from '../../../../shared/services/form/form-helper-service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-reset-password',
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
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword implements OnInit {
  form!: FormGroup;
  formHelper = inject(FormHelperService);
  userService = inject(UserService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  route = inject(ActivatedRoute);

  loadingRequest = signal(false);
  validatingToken = signal(true);
  tokenValid = signal(false);
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  token: string | null = null;

  constructor() {
    this.form = new FormGroup(
      {
        password: new FormControl<string>(null!, [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl<string>(null!, [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];

      if (!this.token) {
        this.validatingToken.set(false);
        this.tokenValid.set(false);
        this.snackBar.open('Token inválido ou expirado.', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-error'],
        });
        return;
      }

      this.userService.verifyEmail(this.token).subscribe({
        next: () => {
          this.tokenValid.set(true);
          this.validatingToken.set(false);
        },
        error: (err: unknown) => {
          this.validatingToken.set(false);
          this.tokenValid.set(false);
          console.error('Erro ao validar token:', err);

          let message = 'Token inválido ou expirado. Solicite um novo link.';

          if (err instanceof Object && 'status' in err) {
            const status = (err as Record<string, unknown>)['status'];
            if (status === 400) {
              message = 'O link de recuperação expirou. Solicite um novo.';
            } else if (status === 401) {
              message = 'Token não autenticado. Solicite um novo link.';
            }
          }

          this.snackBar.open(message, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snackbar-error'],
          });
        },
      });
    });
  }

  passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      const errors = control.get('confirmPassword')?.errors;
      if (errors) {
        delete errors['passwordMismatch'];
      }
    }

    return null;
  }

  onSubmit() {
    if (this.form.invalid || !this.token) {
      this.form.markAllAsTouched();
      return;
    }

    this.loadingRequest.set(true);
    const { password } = this.form.getRawValue();

    this.userService
      .resetPassword(this.token, { newPassword: password })
      .subscribe({
        next: () => {
          this.snackBar.open(
            'Senha alterada com sucesso! Redirecionando para login...',
            'Fechar',
            {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['snackbar-success'],
            }
          );

          this.loadingRequest.set(false);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err: unknown) => {
          console.error('Erro ao resetar senha:', err);

          let message = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';

          if (err instanceof Object && 'status' in err) {
            const status = (err as Record<string, unknown>)['status'];
            if (status === 400) {
              message = 'Falha ao atualizar a senha. Tente novamente.';
            } else if (status === 401) {
              message = 'Token expirado. Solicite um novo link.';
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

  togglePasswordVisibility() {
    this.showPassword.update((value) => !value);
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword.update((value) => !value);
  }
}
