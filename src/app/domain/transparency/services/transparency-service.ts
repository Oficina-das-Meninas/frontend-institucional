import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccordionContent } from '../models/accordionContent';
import { map, Observable } from 'rxjs';
import { CategoriesResponse } from '../models/categoriesResponse';
import { AccordionContentType } from '../models/accordionContentType';

@Injectable({
  providedIn: 'root'
})
export class TransparencyService {

  private apiUrl = "http://localhost:8080/api";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<AccordionContent[]> {
    return this.httpClient.get<CategoriesResponse>(`${this.apiUrl}/transparencies`)
    .pipe(
      map(response => response.categories.map(category => ({
        categoryName: category.name,
        type: category.isImage ? 
          AccordionContentType.COLLABORATOR :
          AccordionContentType.DOCUMENT,
        documents: category.documents?.map(doc => ({
          name: doc.title,
          url: doc.previewLink
        })),
        collaborators: category.collaborators?.map(collab => ({
          imageUrl: collab.previewLink,
          name: collab.name,
          role: collab.role,
          description: collab.description
        }))
      })))
    );
  }
  
}
