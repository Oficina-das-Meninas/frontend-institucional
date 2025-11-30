import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { DonationDescriptionCard } from '../../components/donation-description-card/donation-description-card';
import { DonationDescriptionCardType } from '../../model/donation-description';
import { UserService } from '../../services/user';
import { cpfValidator } from '../../../../shared/validators/document.validator';
import { SponsorshipDto } from '../../model/user-models';

@Component({
  selector: 'app-profile-game',
  standalone: true,
  imports: [
    CommonModule,
    MatSliderModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    DonationDescriptionCard,
  ],
  templateUrl: './profile-game.html',
  styleUrl: './profile-game.scss',
})
export class ProfileGame implements OnInit {
  private fb = inject(FormBuilder);
  userService = inject(UserService);

  currentPage = signal(0);
  pageSize = 5;
  hasMorePages = signal(true);
  donations = signal<DonationDescriptionCardType[]>([]);
  subscription = signal<SponsorshipDto | null>(null);

  showCancelModal = signal(false);
  isCancelling = signal(false);

  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  step = signal<number | null>(null);

  constructor() {
    this.initForms();
  }

  ngOnInit() {
    this.loadDonations();
    this.loadUserData();
    this.loadSubscription();
  }

  initForms() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      cpf: ['', [Validators.required, cpfValidator()]],
    });

    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  setStep(index: number) {
    this.step.set(index);
  }

  saveField(fieldName: string) {
    if (this.profileForm.get(fieldName)?.valid) {
      this.step.set(null);
    }
  }

  changePassword() {
    if (this.passwordForm.valid) {
      this.passwordForm.reset();
      this.step.set(null);
    }
  }

  currentScore = computed(() => {
    const list = this.donations();
    return list.length > 0 ? list[0].totalPoints : 0;
  });

  levelData = computed(() => {
    const score = this.currentScore();
    if (score < 500)
      return { name: 'Semente', image: 'seed-image.png', nextThreshold: 500 };
    else if (score < 1000)
      return { name: 'Broto', image: 'broto-image.svg', nextThreshold: 1000 };
    return {
      name: 'Margarida',
      image: 'margarida-image.png',
      nextThreshold: 2000,
    };
  });

  nextLevelScore = computed(() => this.levelData().nextThreshold);

  progressPercentage = computed(() => {
    const next = this.nextLevelScore();
    if (next === 0) return '0%';
    return Math.min((this.currentScore() / next) * 100, 100) + '%';
  });

  tooltipText = computed(() => {
    const missing = Math.max(0, this.nextLevelScore() - this.currentScore());
    return `Faltam ${missing} pontos para o próximo nível`;
  });

  donationsGrouped = computed(() => {
    const list = this.donations();
    const groups: { label: string; items: DonationDescriptionCardType[] }[] =
      [];

    list.forEach((donation) => {
      const date = new Date(donation.donatedDate);

      let label = date.toLocaleString('pt-BR', {
        month: 'long',
        year: 'numeric',
      });
      label = label.charAt(0).toUpperCase() + label.slice(1);

      const lastGroup = groups[groups.length - 1];

      if (lastGroup && lastGroup.label === label) {
        lastGroup.items.push(donation);
      } else {
        groups.push({ label, items: [donation] });
      }
    });

    return groups;
  });

  loadUserData() {
    this.userService.getInfoLoggedUser().subscribe({
      next: (res) => {
        const user = res.data;
        this.profileForm.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone,
          cpf: user.document,
        });
      },
    });
  }

  loadSubscription() {
    this.userService.getRecurringSubscription().subscribe({
      next: (res) => {
        this.subscription.set(res?.data || null);
      },
      error: () => {
        this.subscription.set(null);
      },
    });
  }

  loadDonations() {
    this.userService
      .getDonationPointsByUser(this.currentPage(), this.pageSize)
      .subscribe({
        next: (res) => {
          this.donations.update((current) => [
            ...current,
            ...res.data.contents,
          ]);
          if (this.currentPage() >= res.data.totalPages - 1)
            this.hasMorePages.set(false);
        },
      });
  }

  onLoadMore() {
    this.currentPage.update((p) => p + 1);
    this.loadDonations();
  }

  onCancelSubscriptionClick() {
    this.showCancelModal.set(true);
  }

  closeCancelModal() {
    this.showCancelModal.set(false);
  }

  confirmCancellation() {
    this.isCancelling.set(true);
    this.userService.cancelRecurringSubscription().subscribe({
      next: () => {
        this.isCancelling.set(false);
        this.closeCancelModal();
      },
      error: () => {
        this.isCancelling.set(false);
        this.closeCancelModal();
      },
      complete: () => {
        this.loadSubscription();
      },
    });
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('newPassword');
    const confirm = control.get('confirmNewPassword');
    if (!password || !confirm) return null;
    return password.value === confirm.value ? null : { passwordMismatch: true };
  }
}
