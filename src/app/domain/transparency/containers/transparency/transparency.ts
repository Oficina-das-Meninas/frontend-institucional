import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TransparencyAccordion } from "../../components/transparency-accordion/transparency-accordion";
import { AccordionContent } from '../../models/accordion-content';
import { TransparencyService } from '../../services/transparency-service';

@Component({
  selector: 'app-transparency',
  imports: [TransparencyAccordion, AsyncPipe],
  templateUrl: './transparency.html',
  styleUrl: './transparency.scss'
})
export class Transparency {
  accordionContent$: Observable<AccordionContent[]> | null = null;

  private transparencyService = inject(TransparencyService);

  ngOnInit() {
    this.accordionContent$ = this.transparencyService.list();
  }
}
