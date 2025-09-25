import { Component, Input, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { AccordionContent } from '../../models/accordion-content';
import { AccordionContentType } from '../../models/accordion-content-type';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-transparency-accordion',
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './transparency-accordion.html',
  styleUrl: './transparency-accordion.scss',
})
export class TransparencyAccordion {
  @Input() content?: AccordionContent;

  panelOpenState = signal(false);
  accordionContentType = AccordionContentType;
}
