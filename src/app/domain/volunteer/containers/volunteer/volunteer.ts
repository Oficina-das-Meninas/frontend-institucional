import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormHelperService } from '../../../../shared/services/form/form-helper-service';

@Component({
  selector: 'app-volunteer',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TextFieldModule,
    NgxMaskDirective,
    MatSelectModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.scss',
})
export class Volunteer {
  volunteerForm!: FormGroup;

  private formBuilder = inject(FormBuilder);
  formHelperService = inject(FormHelperService);

  private readonly ongPhoneNumber = '551633226232';

  readonly days = [
    { key: 'sunday', label: 'Domingo' },
    { key: 'monday', label: 'Segunda-feira' },
    { key: 'tuesday', label: 'Terça-feira' },
    { key: 'wednesday', label: 'Quarta-feira' },
    { key: 'thursday', label: 'Quinta-feira' },
    { key: 'friday', label: 'Sexta-feira' },
    { key: 'saturday', label: 'Sábado' },
  ];

  readonly periods = [
    { value: 'full_day', label: 'Dia inteiro (8h às 18h)' },
    { value: 'morning', label: 'Manhã (até 12h)' },
    { value: 'afternoon', label: 'Tarde (após 12h)' },
  ];

  ngOnInit() {
    this.volunteerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      cpf: ['', Validators.required],
      proposal: ['', [Validators.required, Validators.minLength(5)]],
      availability: this.formBuilder.group(
        {
          sunday: [''],
          monday: [''],
          tuesday: [''],
          wednesday: [''],
          thursday: [''],
          friday: [''],
          saturday: [''],
        },
        {
          validators: this.availabilityValidator,
        }
      ),
    });
  }

  onSubmit(): void {
    if (this.volunteerForm.valid) {
      const message = this.buildMessage();
      this.openWhatsApp(message);
    } else {
      this.formHelperService.validateAllFormFields(this.volunteerForm);
    }
  }

  private buildMessage(): string {
    const { name, cpf, proposal, availability } = this.volunteerForm.value;

    const selectedDays = this.days
      .map((day) => {
        const periodValue = availability[day.key];
        const periodLabel = this.periods.find(
          (p) => p.value === periodValue
        )?.label;
        return periodValue ? `- ${day.label}: ${periodLabel}` : null;
      })
      .filter(Boolean)
      .join('\n');

    const availabilityMessage = selectedDays
      ? `\n\nDisponibilidade:\n${selectedDays}`
      : '';

    return (
      `Olá! Tenho interesse em ser um(a) voluntário(a).\n` +
      `Meu nome é ${name}.\nMeu CPF é ${cpf}.\n` +
      `Minha proposta de voluntariado é: ${proposal}${availabilityMessage}`
    );
  }

  private openWhatsApp(message: string): void {
    const encodedMessage = encodeURIComponent(message);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `whatsapp://send?phone=${this.ongPhoneNumber}&text=${encodedMessage}`;
    } else {
      window.open(
        `https://web.whatsapp.com/send?phone=${this.ongPhoneNumber}&text=${encodedMessage}`,
        '_blank'
      );
    }
  }

  private availabilityValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const hasAvailability = Object.values((group as FormGroup).controls).some(
      (control) => control.value
    );
    return hasAvailability ? null : { atLeastOneDayRequired: true };
  }
}
