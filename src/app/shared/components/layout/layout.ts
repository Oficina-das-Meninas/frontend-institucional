import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';
import { Toolbar } from './toolbar/toolbar';

@Component({
  selector: 'app-layout',
  imports: [Toolbar, Footer, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  
}
