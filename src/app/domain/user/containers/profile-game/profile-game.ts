import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DonationDescriptionCard } from '../../components/donation-description-card/donation-description-card';
import { DonationDescriptionCardType } from '../../model/donation-description';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-profile-game',
  standalone: true,
  imports: [
    MatSliderModule,
    MatExpansionModule,
    MatTooltipModule,
    DonationDescriptionCard,
  ],
  templateUrl: './profile-game.html',
  styleUrl: './profile-game.scss',
})
export class ProfileGame implements OnInit {
  currentPage = signal(0);
  pageSize = 5;
  hasMorePages = signal(true);

  donations = signal<DonationDescriptionCardType[]>([]);
  userService = inject(UserService);

  userId = '039cb804-e62b-4a04-9147-d7fb5e46ec95';

  currentScore = computed(() => {
    const list = this.donations();
    return list.length > 0 ? list[0].totalPoints : 0;
  });

  levelData = computed(() => {
    const score = this.currentScore();

    if (score < 500) {
      return {
        name: 'Semente',
        image: 'seed-image.png',
        nextThreshold: 500,
      };
    } else if (score < 1000) {
      return {
        name: 'Broto',
        image: 'broto-image.svg',
        nextThreshold: 1000,
      };
    } else {
      return {
        name: 'Margarida',
        image: 'margarida-image.png',
        nextThreshold: 2000,
      };
    }
  });

  nextLevelScore = computed(() => this.levelData().nextThreshold);

  progressPercentage = computed(() => {
    const score = this.currentScore();
    const next = this.nextLevelScore();

    if (next === 0) return '0%';
    const percentage = (score / next) * 100;
    return Math.min(percentage, 100) + '%';
  });

  tooltipText = computed(() => {
    const score = this.currentScore();
    const next = this.nextLevelScore();
    const missing = Math.max(0, next - score);
    return `Faltam ${missing} pontos para o próximo nível`;
  });

  constructor() {}

  ngOnInit() {
    this.loadDonations();
  }

  loadDonations() {
    this.userService
      .getDonationPointsByUser(this.userId, this.currentPage(), this.pageSize)
      .subscribe({
        next: (res) => {
          const newDonations = res.data.contents;
          const totalPages = res.data.totalPages;

          this.donations.update((current) => [...current, ...newDonations]);

          if (this.currentPage() >= totalPages - 1) {
            this.hasMorePages.set(false);
          }
        },
        error: (err) => console.error('Erro ao carregar doações', err),
      });
  }

  onLoadMore() {
    this.currentPage.update((p) => p + 1);
    this.loadDonations();
  }
}
