import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-render-html',
  imports: [],
  templateUrl: './render-html.html',
  styleUrl: './render-html.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RenderHtml {
  private _content: string = '';
  safeHtml: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  @Input()
  set content(value: string) {
    this._content = value;
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this._content);
  }

  get content(): string {
    return this._content;
  }
}
