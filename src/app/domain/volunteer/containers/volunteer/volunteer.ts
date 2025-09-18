import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule
  ],
  providers: [provideNgxMask()],
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.scss'
})
export class Volunteer {

  volunteerForm!: FormGroup;
  private formBuilder = inject(FormBuilder);

  private readonly OngPhoneNumber = '551633226232';

  days = [
    { key: 'monday', label: 'Segunda-feira' },
    { key: 'tuesday', label: 'Terça-feira' },
    { key: 'wednesday', label: 'Quarta-feira' },
    { key: 'thursday', label: 'Quinta-feira' },
    { key: 'friday', label: 'Sexta-feira' }
  ];
  periods = [
    { value: 'morning', label: 'Manhã' },
    { value: 'afternoon', label: 'Tarde' },
    { value: 'both', label: 'Manhã e Tarde' }
  ];

  ngOnInit() {
    this.volunteerForm = this.formBuilder.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      proposal: ['', Validators.required],
      availability: this.formBuilder.group({
        monday: [''],
        tuesday: [''],
        wednesday: [''],
        thursday: [''],
        friday: ['']
      }, {
        validators: (group: AbstractControl): ValidationErrors | null => {
          const hasAvailability = Object.values((group as FormGroup).controls).some(control => control.value);
          return hasAvailability ? null : { atLeastOneDayRequired: true };
        }
      })
    });
  }

  onSubmit(): void {
    if (this.volunteerForm.invalid) {
      this.volunteerForm.markAllAsTouched();
      return;
    }

    const { name, cpf, proposal, availability } = this.volunteerForm.value;

    let availabilityMessage = '';
    const selectedDays: string[] = [];

    this.days.forEach(day => {
      const periodValue = availability[day.key];
      if (periodValue) {
        const periodLabel = this.periods.find(p => p.value === periodValue)?.label;
        selectedDays.push(`- ${day.label}: ${periodLabel}`);
      }
    });

    if (selectedDays.length > 0) {
      availabilityMessage = '\n\nDisponibilidade:\n' + selectedDays.join('\n');
    }

    const message = `Olá! Tenho interesse em ser um(a) voluntário(a).\nMeu nome é ${name}.\nMeu CPF é ${cpf}.\nMinha proposta de voluntariado é: ${proposal}${availabilityMessage}`;

    const encodedMessage = encodeURIComponent(message);
    let whatsappUrl;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `whatsapp://send?phone=${this.OngPhoneNumber}&text=${encodedMessage}`;
    } else {
      window.open(`https://web.whatsapp.com/send?phone=${this.OngPhoneNumber}&text=${encodedMessage}`, "_blank");
    }
  }
}
