import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { MaskPipe } from '../../../../shared/pipes/mask.pipe';
import { ToastService } from '../../../../shared/services/toast';
import { cpfValidator } from '../../../../shared/validators/document.validator';
import { DonationDescriptionCard } from '../../components/donation-description-card/donation-description-card';
import { DonationDescriptionCardType } from '../../model/donation-description';
import { SponsorshipDto, UpdateUserDto } from '../../model/user-models';
import { UserService } from '../../services/user';

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
    MaskPipe,
    NgxMaskDirective,
    MatCheckboxModule,
  ],
  templateUrl: './profile-game.html',
  styleUrl: './profile-game.scss',
})
export class ProfileGame implements OnInit {
  private fb = inject(FormBuilder);
  userService = inject(UserService);
  toastService = inject(ToastService);

  currentPage = signal(0);
  pageSize = 5;
  hasMorePages = signal(true);
  donations = signal<DonationDescriptionCardType[]>([]);
  subscription = signal<SponsorshipDto | null>(null);

  showCancelModal = signal(false);
  isCancelling = signal(false);
  isSaving = signal(false);
  userId = signal<string | null>(null);

  showPasswords = signal(false);

  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  step = signal<number>(-1);

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
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[ \p{L}]+$/u),
        ],
      ],
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
    if (this.profileForm.get(fieldName)?.valid && this.userId()) {
      this.isSaving.set(true);

      const fieldValue = this.profileForm.get(fieldName)?.value;
      const updateData: UpdateUserDto = {
        id: this.userId()!,
      };

      if (fieldName === 'cpf') {
        updateData.document = fieldValue;
      } else {
        (updateData as any)[fieldName] = fieldValue;
      }

      this.userService.updateUser(updateData).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.toastService.show(
            `${this.getFieldLabel(fieldName)} atualizado com sucesso!`,
            'success'
          );
          this.step.set(-1);
        },
        error: () => {
          this.isSaving.set(false);
          this.toastService.show(
            `Erro ao atualizar ${this.getFieldLabel(fieldName).toLowerCase()}`,
            'error'
          );
        },
      });
    }
  }

  changePassword() {
    if (this.passwordForm.valid && this.userId()) {
      this.isSaving.set(true);
      const currentPassword = this.passwordForm.get('currentPassword')?.value;

      this.userService.verifyPassword(currentPassword).subscribe({
        next: () => {
          const updateData: UpdateUserDto = {
            id: this.userId()!,
            password: this.passwordForm.get('newPassword')?.value,
          };

          this.userService.updateUser(updateData).subscribe({
            next: () => {
              this.isSaving.set(false);
              this.passwordForm.reset();
              this.toastService.show('Senha alterada com sucesso!', 'success');
              this.step.set(-1);
            },
            error: () => {
              this.isSaving.set(false);
              this.toastService.show('Erro ao alterar senha', 'error');
            },
          });
        },
        error: (err) => {
          this.isSaving.set(false);
          this.toastService.show(err, 'error');
        },
      });
    }
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Nome',
      email: 'E-mail',
      phone: 'Telefone',
      cpf: 'CPF',
    };
    return labels[fieldName] || fieldName;
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

    const isSingular = missing <= 1;
    const suffix = isSingular ? 'ponto' : 'pontos';
    const verb = isSingular ? 'Falta' : 'Faltam';

    return `${verb} ${missing} ${suffix} para o próximo nível`;
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
        this.userId.set(user.id);
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
        const data = res?.data || null;

        if (data && data.startDate) {
          const dateObj = new Date(data.startDate);
          dateObj.setHours(dateObj.getHours() - 3);

          data.startDate = dateObj.toISOString();
        }

        this.subscription.set(data);
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
        this.subscription.set(null);
      },
      error: () => {
        this.isCancelling.set(false);
        this.closeCancelModal();
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

  toggleShowPasswords() {
    this.showPasswords.update((val) => !val);
  }
}
