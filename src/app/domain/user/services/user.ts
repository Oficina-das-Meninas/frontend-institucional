import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DonationDescriptionCardType } from '../model/donation-description';
import { Observable, tap } from 'rxjs';
import {
  CreateUserRequest,
  LoginRequest,
  LoginResponse,
  SponsorshipDto,
  UserResponse,
} from '../model/user-models';
import { ApiResponse } from '../../../shared/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = `${environment.apiUrl}/users`;
  private readonly AUTH_URL = `${environment.apiUrl}/auth`;
  private readonly SESSION_URL = `${environment.apiUrl}/sessions`;
  private readonly DONATION_URL = `${environment.apiUrl}/donations`; // Endpoint for donations
  private httpClient = inject(HttpClient);

  userName = signal<string | null>(null);

  getDonationPointsByUser(page: number = 0, pageSize: number = 5) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.httpClient.get<{
      data: {
        contents: DonationDescriptionCardType[];
        totalElements: number;
        totalPages: number;
      };
    }>(`${this.API_URL}/pontuations`, {
      params,
      withCredentials: true,
    });
  }

  getInfoLoggedUser(): Observable<ApiResponse<UserResponse>> {
    return this.httpClient.get<ApiResponse<UserResponse>>(
      `${this.API_URL}/me`,
      { withCredentials: true }
    );
  }

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

  createUserAccount(
    data: CreateUserRequest
  ): Observable<ApiResponse<UserResponse>> {
    return this.httpClient.post<ApiResponse<UserResponse>>(
      `${this.AUTH_URL}/signup`,
      data
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

  getSession(): Observable<ApiResponse<{ username: string }>> {
    return this.httpClient
      .get<ApiResponse<{ username: string }>>(this.SESSION_URL, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.userName.set(response.data.username);
        })
      );
  }

  getRecurringSubscription(): Observable<ApiResponse<SponsorshipDto>> {
    return this.httpClient.get<ApiResponse<SponsorshipDto>>(
      `${this.DONATION_URL}/recurring`,
      { withCredentials: true }
    );
  }

  cancelRecurringSubscription(): Observable<void> {
    return this.httpClient.delete<void>(`${this.DONATION_URL}/recurring`, {
      withCredentials: true,
    });
  }

  verifyUserEmail(token: string): Observable<void> {
    const params = new HttpParams().set('token', token);
    return this.httpClient.get<void>(`${this.AUTH_URL}/verify-email`, {
      params,
    });
  }
}
