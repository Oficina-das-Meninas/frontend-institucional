import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DonationDescriptionCardType } from '../model/donation-description';

@Injectable({
  providedIn: 'root',
})
export class UserDonations {
  private readonly API_URL = `${environment.apiUrl}/users`;
  private httpClient = inject(HttpClient);

  getDonationPointsByUser(userId: string) {
    return this.httpClient.get<{
      data: {
        contents: DonationDescriptionCardType[];
        totalElements: number;
        totalPages: number;
      };
    }>(`${this.API_URL}/${userId}/pontuations`);
  }
}
