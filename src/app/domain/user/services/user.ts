import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DonationDescriptionCardType } from '../model/donation-description';
import { Observable } from 'rxjs';
import {
  SponsorshipDto,
  UpdateUserDto,
  UserResponse,
} from '../model/user-models';
import { ApiResponse } from '../../../shared/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = `${environment.apiUrl}/users`;
  private readonly DONATION_URL = `${environment.apiUrl}/donations`;
  private httpClient = inject(HttpClient);

  getInfoLoggedUser(): Observable<ApiResponse<UserResponse>> {
    return this.httpClient.get<ApiResponse<UserResponse>>(
      `${this.API_URL}/me`,
      { withCredentials: true }
    );
  }

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

  updateUser(updateData: UpdateUserDto): Observable<ApiResponse<UserResponse>> {
    return this.httpClient.put<ApiResponse<UserResponse>>(
      `${this.API_URL}/${updateData.id}`,
      updateData,
      { withCredentials: true }
    );
  }

  verifyPassword(password: string): Observable<void> {
    return this.httpClient.post<void>(
      `${this.API_URL}/verify-password`,
      { password },
      { withCredentials: true }
    );
  }
}
