import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-login',
  standalone: true,
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
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form!: FormGroup;
  formHelper = inject(FormHelperService);
  userService = inject(UserService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  loadingRequest = false;

  constructor() {
    this.form = new FormGroup({
      email: new FormControl<string>(null!, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>(null!, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loadingRequest = true;
    const { email, password } = this.form.getRawValue();

    this.userService.login({ email, password }).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loadingRequest = false;
        console.error('Erro ao realizar login:', err);

        let message = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';

        if (err.status === 401 || err.status === 403) {
          message = 'E-mail ou senha inválidos.';
        }

        this.snackBar.open(message, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-error'],
        });
      },
      complete: () => {
        this.loadingRequest = false;
      },
    });
  }
}
