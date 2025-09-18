import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-event-paginator',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './event-paginator.html',
  styleUrl: './event-paginator.scss'
})
export class EventPaginator {
  @Input() length!: number;
  @Input() pageSize!: number;
  @Input() pageIndex!: number;

  @Output() readonly page = new EventEmitter<PageEvent>();

  onPageChange() {
    this.page.emit({
      length: this.length,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    });
  }

  getNumberOfPages(): number {
    if (!this.pageSize) {
      return 0;
    }
    return Math.ceil(this.length / this.pageSize);
  }

  hasPreviousPage(): boolean {
    return this.pageIndex >= 1 && this.pageSize != 0;
  }

  hasNextPage(): boolean {
    const maxPageIndex = this.getNumberOfPages() - 1;
    return this.pageIndex < maxPageIndex && this.pageSize != 0;
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.pageIndex++;
      this.onPageChange();
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.pageIndex--;
      this.onPageChange();
    }
  }
}
