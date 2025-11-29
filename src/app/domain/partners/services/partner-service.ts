import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ImageService } from '../../../shared/services/image-service';
import { PartnerListResponse } from '../models/partner-list-response';

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  private readonly API_URL = `${environment.apiUrl}/partners`;
  private httpClient = inject(HttpClient);
  private imageService = inject(ImageService);

  private transformPartner(partner: any) {
    return {
      ...partner,
      previewImageUrl: this.imageService.getPubImageUrl(partner.previewImageUrl),
    };
  }

  list(page = 0, pageSize = 10) {
    return this.httpClient
      .get<{ data: PartnerListResponse }>(this.API_URL, {
        params: {
          page: page,
          pageSize: pageSize,
        },
      })
      .pipe(
        map(response => ({
          data: response.data.contents.map(partner => ({
            ...partner,
            previewImageUrl: this.imageService.getPubImageUrl(partner.previewImageUrl),
          })),
          totalElements: response.data.totalItems,
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          pageSize: response.data.pageSize,
        }))
      );
  }
}
