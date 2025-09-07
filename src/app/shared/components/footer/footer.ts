import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Logo } from '../logo/logo';
import { FacebookIconComponent } from '../social-icons/facebook-icon';
import { InstagramIconComponent } from '../social-icons/instagram-icon';
import { YoutubeIconComponent } from '../social-icons/youtube-icon';

@Component({
  selector: 'app-footer',
  imports: [FacebookIconComponent, InstagramIconComponent, YoutubeIconComponent, MatIconModule, RouterLink, Logo],
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
