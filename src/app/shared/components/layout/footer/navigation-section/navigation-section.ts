import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface NavigationLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-navigation-section',
  imports: [RouterLink, CommonModule],
  standalone: true,
  templateUrl: './navigation-section.html',
})
export class NavigationSectionComponent {
  @Input() title: string = '';
  @Input() links: NavigationLink[] = [];
}
