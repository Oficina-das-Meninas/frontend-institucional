import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Logo } from '../../../logo/logo';
import { FacebookIconComponent } from '../../../social-icons/facebook-icon';
import { InstagramIconComponent } from '../../../social-icons/instagram-icon';
import { YoutubeIconComponent } from '../../../social-icons/youtube-icon';
import { SocialLink } from '../footer';

@Component({
  selector: 'app-organization-info',
  imports: [FacebookIconComponent, InstagramIconComponent, YoutubeIconComponent, Logo, CommonModule],
  standalone: true,
  templateUrl: './organization-info.html',
})
export class OrganizationInfoComponent {
  @Input() socialLinks: SocialLink[] = [];
}
