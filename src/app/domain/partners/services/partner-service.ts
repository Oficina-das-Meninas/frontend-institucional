import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ImageService } from '../../../shared/services/image-service';
import { PartnerPage } from '../models/partner-page';

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
      .get<PartnerPage>(this.API_URL, {
        params: {
          page: page,
          pageSize: pageSize,
        },
      })
      .pipe(
        first(),
        map(partnerPage => {
          const transformed = {
            ...partnerPage,
            data: partnerPage.data.map(partner => this.transformPartner(partner))
          };
          return transformed as PartnerPage;
        })
      );
  }
}
