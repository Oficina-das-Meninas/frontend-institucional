import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DonationDescriptionCardType } from '../model/donation-description';

@Injectable({
  providedIn: 'root',
})
export class UserDonations {
  private readonly API_URL = `${environment.apiUrl}/users`;
  private httpClient = inject(HttpClient);

  getDonationPointsByUser(
    userId: string,
    page: number = 0,
    pageSize: number = 5
  ) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.httpClient.get<{
      data: {
        contents: DonationDescriptionCardType[];
        totalElements: number;
        totalPages: number;
      };
    }>(`${this.API_URL}/${userId}/pontuations`, { params });
  }
}
