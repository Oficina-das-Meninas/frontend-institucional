import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router, private location: Location) {}

  navigateToPartners() {
    console.log('navigating to partners', this.location.path());
    if (this.location.path() == '') return;

    this.router.navigate(['/'], { fragment: 'parceiros' });
    setTimeout(() => {
      const element = document.getElementById('parceiros');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  socialLinks: SocialLink[] = [
    { icon: 'instagram', link: 'https://www.instagram.com/oficinadasmeninasoficial/', label: 'Instagram' },
    { icon: 'facebook', link: 'https://www.facebook.com/OficinaDasMeninas', label: 'Facebook' },
    { icon: 'youtube', link: 'https://www.youtube.com/channel/UCXYFKD-9GGVaMeV5SZvh0tg', label: 'YouTube' },
  ];

  aboutLinks: NavigationLink[] = [
    { label: 'História', route: '/sobre' },
    { label: 'Eventos', route: '/eventos' },
    { label: 'Parceiros', route: '', onClick: () => this.navigateToPartners() },
    { label: 'Transparência', route: '/transparencia' },
  ];

  accountLinks: NavigationLink[] = [
    { label: 'Acessar conta', route: '/' },
    { label: 'Criar uma conta', route: '/' },
  ];

  helpLinks: NavigationLink[] = [
    { label: 'Faça uma doação', route: '/faca-sua-doacao' },
    { label: 'Doe nota fiscal', route: '/doar-nota-fiscal' },
    { label: 'Doe imposto de renda', route: '/' },
    { label: 'Seja um voluntário', route: '/seja-um-voluntario' },
    { label: 'Seja um padrinho', route: '/seja-um-padrinho' }
  ];
}
