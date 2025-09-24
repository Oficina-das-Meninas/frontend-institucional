import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-event-info',
  imports: [MatIcon],
  templateUrl: './event-info.html',
  styleUrl: './event-info.scss'
})
export class EventInfo {
  @Input() icon!: string;
  @Input() text!: string;
  @Input() isLoading: boolean = false;
  @Input() cssClass: string = '';
}
