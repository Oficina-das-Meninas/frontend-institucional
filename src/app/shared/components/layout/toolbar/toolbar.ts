import {
  Component,
  ElementRef,
  inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { DropdownComponent } from '../../dropdown/dropdown';
import { UserService } from '../../../../domain/user/services/user';

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
    MatExpansionModule,
    DropdownComponent,
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Toolbar {
  @ViewChild('drawerContainer', { static: false, read: ElementRef })
  drawerContainerRef?: ElementRef;
  @ViewChild('drawer') drawer!: MatSidenav;

  userService = inject(UserService);

  toggleDrawer(): void {
    if (this.drawer) {
      if (
        !this.drawer.opened &&
        this.drawerContainerRef &&
        this.drawerContainerRef.nativeElement
      ) {
        this.drawerContainerRef.nativeElement.style.setProperty(
          'z-index',
          '51',
          'important'
        );
      }
      this.drawer.toggle();

      if (this.drawer.opened) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    }
  }

  onDrawerClosed(): void {
    if (this.drawerContainerRef && this.drawerContainerRef.nativeElement) {
      this.drawerContainerRef.nativeElement.style.removeProperty('z-index');

      document.body.classList.remove('overflow-hidden');
    }
  }

  closeDrawer(): void {
    if (this.drawer && this.drawer.opened) {
      this.drawer.close();
    }
  }
}
