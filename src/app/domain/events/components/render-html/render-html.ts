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
    const cleanedContent = this.sanitizeWithDOMParser(this._content);
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(cleanedContent);
  }

  get content(): string {
    return this._content;
  }

  private sanitizeWithDOMParser(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    doc.querySelectorAll('script').forEach(script => script.remove());

    const allElements = doc.querySelectorAll('*');
    allElements.forEach(element => {
      Array.from(element.attributes).forEach(attr => {
        if (attr.name.startsWith('on')) {
          element.removeAttribute(attr.name);
        }
      });

      // Remove javascript: de href e src
      if (element.getAttribute('href')?.startsWith('javascript:')) {
        element.setAttribute('href', '#');
      }
      if (element.getAttribute('src')?.startsWith('javascript:')) {
        element.setAttribute('src', '');
      }
    });

    return doc.body.innerHTML;
  }
}
