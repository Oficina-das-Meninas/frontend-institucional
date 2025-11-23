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
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-signup',
  standalone: true,
  providers: [provideNgxMask()],
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
    NgxMaskDirective,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class SignUp {
  form!: FormGroup;
  formHelper = inject(FormHelperService);
  userService = inject(UserService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  loadingRequest = false;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl<string>(null!, [Validators.required]),
      document: new FormControl<string>(null!, [Validators.required]), // CPF
      email: new FormControl<string>(null!, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl<string>(null!, [Validators.required]),
      password: new FormControl<string>(null!, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loadingRequest = true;
    const rawValue = this.form.getRawValue();

    const payload = {
      name: rawValue.name,
      email: rawValue.email,
      document: rawValue.document.replace(/\D/g, ''),
      phone: rawValue.phone.replace(/\D/g, ''),
      password: rawValue.password,
    };

    this.userService.createUserAccount(payload).subscribe({
      next: () => {
        this.snackBar.open(
          'Conta criada com sucesso! Faça login para continuar.',
          'Fechar',
          {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snackbar-success'],
          }
        );
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loadingRequest = false;
        console.error('Erro ao criar conta:', err);

        let message = 'Ocorreu um erro ao criar sua conta. Tente novamente.';

        if (err.status === 409) {
          message = 'Este e-mail ou CPF já está cadastrado.';
        } else if (err.error && err.error.message) {
          message = err.error.message;
        }
      },
      complete: () => {
        this.loadingRequest = false;
      },
    });
  }
}
