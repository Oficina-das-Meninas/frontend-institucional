import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PartnerPage } from '../models/partner-page';

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  private readonly API_URL = `${environment.apiUrl}/partners`;
  private httpClient = inject(HttpClient);

  list(page = 0, pageSize = 10) {
    return this.httpClient
      .get<PartnerPage>(this.API_URL, {
        params: {
          page: page,
          pageSize: pageSize,
        },
      })
      .pipe(first());
  }
}
