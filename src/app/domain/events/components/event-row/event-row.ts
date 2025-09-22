import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-event-row',
  imports: [MatIcon],
  templateUrl: './event-row.html',
  styleUrl: './event-row.scss'
})
export class EventRow {
  @Input() icon!: string;
  @Input() text!: string;
  @Input() isLoading: boolean = false;
}
