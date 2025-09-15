import { Component } from '@angular/core';
import { Footer } from "../../../../shared/components/footer/footer";
import { Toolbar } from "../../../../shared/components/toolbar/toolbar";
import { TransparencyAccordion } from "../../components/transparency-accordion/transparency-accordion";
import { AccordionContent } from '../../models/accordionContent';
import { TransparencyService } from '../../services/transparency-service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-transparency',
  imports: [Footer, Toolbar, TransparencyAccordion, AsyncPipe],
  templateUrl: './transparency.html',
  styleUrl: './transparency.scss'
})
export class Transparency {

  accordionContent$: Observable<AccordionContent[]>;

  constructor(private transparencyService: TransparencyService) {
    this.accordionContent$ = this.transparencyService.getAll();
  }

}
