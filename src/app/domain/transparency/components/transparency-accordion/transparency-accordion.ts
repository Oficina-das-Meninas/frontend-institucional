import { Component, Input, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { AccordionContentType } from '../../models/accordionContentType';
import { AccordionContent } from '../../models/accordionContent';

@Component({
  selector: 'app-transparency-accordion',
  imports: [MatExpansionModule],
  templateUrl: './transparency-accordion.html',
  styleUrl: './transparency-accordion.scss'
})
export class TransparencyAccordion {

  @Input() content?: AccordionContent;

  panelOpenState = signal(false);
  accordionContentType = AccordionContentType;

}
