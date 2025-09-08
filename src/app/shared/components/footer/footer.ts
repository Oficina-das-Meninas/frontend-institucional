import { Component } from '@angular/core';
import { ContactInfoComponent } from './contact-info/contact-info';
import { NavigationLink, NavigationSectionComponent } from './navigation-section/navigation-section';
import { OrganizationInfoComponent } from './organization-info/organization-info';

export interface SocialLink {
  icon: 'instagram' | 'facebook' | 'youtube';
  route: string;
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
    { icon: 'instagram', route: '/', label: 'Instagram' },
    { icon: 'facebook', route: '/', label: 'Facebook' },
    { icon: 'youtube', route: '/', label: 'YouTube' },
  ];
  aboutLinks: NavigationLink[] = [
    { label: 'Sobre', route: '/' },
    { label: 'Eventos', route: '/' },
    { label: 'Parceiros', route: '/' },
    { label: 'Transparência', route: '/' },
  ];

  accountLinks: NavigationLink[] = [
    { label: 'Acessar conta', route: '/' },
    { label: 'Criar uma conta', route: '/' },
  ];

  helpLinks: NavigationLink[] = [
    { label: 'Como doar sua nota fiscal', route: '/' },
    { label: 'Como doar seu imposto de renda', route: '/' },
    { label: 'Como se tornar um voluntário', route: '/' },
  ];
}
