import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

import { ApiResponse } from '../../../shared/models/api-response';
import {
  CreateUserRequest,
  LoginRequest,
  LoginResponse,
  UserResponse,
} from '../../../domain/user/model/user-models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_URL = `${environment.apiUrl}/auth`;
  private readonly SESSION_URL = `${environment.apiUrl}/sessions`;
  private httpClient = inject(HttpClient);

  userName = signal<string | null>(null);

  login(data: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.httpClient
      .post<ApiResponse<LoginResponse>>(`${this.AUTH_URL}/login`, data, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.userName.set(response.data.user.name);
        })
      );
  }

  logout(): Observable<void> {
    return this.httpClient
      .get<void>(`${this.AUTH_URL}/logout`, { withCredentials: true })
      .pipe(
        tap(() => {
          this.userName.set(null);
        })
      );
  }

  createUserAccount(
    data: CreateUserRequest
  ): Observable<ApiResponse<UserResponse>> {
    return this.httpClient.post<ApiResponse<UserResponse>>(
      `${this.AUTH_URL}/signup`,
      data
    );
  }

  getSession(): Observable<ApiResponse<{ username: string }> | null> {
    return this.httpClient
      .get<ApiResponse<{ username: string }>>(this.SESSION_URL, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.userName.set(response.data.username);
        }),
        catchError(() => {
          this.userName.set(null);
          return of(null);
        })
      );
  }

  verifyUserEmail(token: string): Observable<void> {
    const params = new HttpParams().set('token', token);
    return this.httpClient.get<void>(`${this.AUTH_URL}/verify-email`, {
      params,
    });
  }

  forgotPassword(email: string): Observable<ApiResponse<void>> {
    return this.httpClient.get<ApiResponse<void>>(
      `${this.AUTH_URL}/forgot-password`,
      {
        params: { email },
        withCredentials: true,
      }
    );
  }

  verifyEmail(token: string): Observable<ApiResponse<void>> {
    return this.httpClient.get<ApiResponse<void>>(
      `${this.AUTH_URL}/verify-email`,
      {
        params: { token },
        withCredentials: true,
      }
    );
  }

  resetPassword(
    token: string,
    resetPasswordDto: { newPassword: string }
  ): Observable<ApiResponse<void>> {
    return this.httpClient.post<ApiResponse<void>>(
      `${this.AUTH_URL}/reset-password`,
      resetPasswordDto,
      {
        params: { token },
        withCredentials: true,
      }
    );
  }
}
