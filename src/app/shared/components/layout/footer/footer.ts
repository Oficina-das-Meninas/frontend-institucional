import { Component } from '@angular/core';
import { ContactInfoComponent } from './contact-info/contact-info';
import { NavigationLink, NavigationSectionComponent } from './navigation-section/navigation-section';
import { OrganizationInfoComponent } from './organization-info/organization-info';

export interface SocialLink {
  icon: 'instagram' | 'facebook' | 'youtube';
  link: string;
  label: string;
}

@Component({
  selector: 'app-footer',
  imports: [ContactInfoComponent, NavigationSectionComponent, OrganizationInfoComponent],
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  socialLinks: SocialLink[] = [
    { icon: 'instagram', link: 'https://www.instagram.com/oficinadasmeninasoficial/', label: 'Instagram' },
    { icon: 'facebook', link: 'https://www.facebook.com/OficinaDasMeninas', label: 'Facebook' },
    { icon: 'youtube', link: 'https://www.youtube.com/channel/UCXYFKD-9GGVaMeV5SZvh0tg', label: 'YouTube' },
  ];

  aboutLinks: NavigationLink[] = [
    { label: 'História', route: '/' },
    { label: 'Eventos', route: '/' },
    { label: 'Parceiros', route: '/' },
    { label: 'Transparência', route: '/' },
  ];

  accountLinks: NavigationLink[] = [
    { label: 'Acessar conta', route: '/' },
    { label: 'Criar uma conta', route: '/' },
  ];

  helpLinks: NavigationLink[] = [
    { label: 'Doe nota fiscal', route: '/' },
    { label: 'Doe seu imposto de renda', route: '/' },
    { label: 'Seja um voluntário', route: '/' },
  ];
}
