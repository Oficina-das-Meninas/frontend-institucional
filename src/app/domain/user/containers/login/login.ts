import { Component, inject, signal } from '@angular/core';
import { Logo } from '../../../../shared/components/logo/logo';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormHelperService } from '../../../../shared/services/form/form-helper-service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../shared/services/auth/auth';

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
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form!: FormGroup;
  formHelper = inject(FormHelperService);
  authService = inject(AuthService);
  router = inject(Router);

  loadingRequest = signal(false);
  hidePassword = signal(true);

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

    this.loadingRequest.set(true);
    const { email, password } = this.form.getRawValue();

    this.authService
      .login({ email, password })
      .subscribe({
        next: () => {
          this.router.navigate(['/perfil']);
        },
      })
      .add(() => {
        setTimeout(() => {
          this.loadingRequest.set(false);
        });
      });
  }
}
