import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  showFiller = false;

  @ViewChild('drawerContainer', { static: false, read: ElementRef }) drawerContainerRef?: ElementRef;

  toggleDrawer(drawer: any): void {
    if (!drawer.opened && this.drawerContainerRef && this.drawerContainerRef.nativeElement) {
      this.drawerContainerRef.nativeElement.style.setProperty('z-index', '51', 'important');
    }
    drawer.toggle();
  }

  onDrawerClosed(): void {
    if (this.drawerContainerRef && this.drawerContainerRef.nativeElement) {
      this.drawerContainerRef.nativeElement.style.removeProperty('z-index');
    }
  }
}
