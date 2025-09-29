import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly BUCKET_URL = `${environment.bucketUrl}/`;

  getImageUrl(key: string): string {
    return this.BUCKET_URL + key;
  }
}
