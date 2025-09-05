import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

let nextId = 0;

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './dropdown.html',
  styleUrls: ['./dropdown.scss'],
})
export class DropdownComponent {
  @Input() expanded = false;
  @Input() disabled = false;
  @Input() headerClass = '';
  @Input() contentClass = '';

  @Output() expandedChange = new EventEmitter<boolean>();

  toggle(): void {
    if (this.disabled) return;
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }
}
