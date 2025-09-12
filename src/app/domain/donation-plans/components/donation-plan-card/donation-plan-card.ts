import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-donation-plan-card',
  templateUrl: './donation-plan-card.html',
  imports: [ MatIconModule ]
})
export class DonationPlanCard {
  @Input() value?: number;
}
