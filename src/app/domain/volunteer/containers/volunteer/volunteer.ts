import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormHelperService } from '../../../../shared/services/form/form-helper-service';
import { ToastService } from '../../../../shared/services/toast';
import { WhatsappService } from '../../../../shared/services/whatsapp';
import { cpfValidator } from '../../../../shared/validators/document.validator';

@Component({
  selector: 'app-volunteer',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TextFieldModule,
    NgxMaskDirective,
    MatSelectModule,
    MatDividerModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.scss',
})
export class Volunteer {
  volunteerForm!: FormGroup;

  private formBuilder = inject(FormBuilder);
  formHelperService = inject(FormHelperService);
  private toastService = inject(ToastService);
  private whatsappService = inject(WhatsappService);

  readonly days = [
    { key: 'monday', label: 'Segunda-feira' },
    { key: 'tuesday', label: 'Terça-feira' },
    { key: 'wednesday', label: 'Quarta-feira' },
    { key: 'thursday', label: 'Quinta-feira' },
    { key: 'friday', label: 'Sexta-feira' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' },
  ];

  readonly periods = [
    { value: null, label: 'Indisponível' },
    { value: 'morning', label: 'Manhã' },
    { value: 'afternoon', label: 'Tarde' },
    { value: 'full_day', label: 'Dia inteiro' },
  ];

  ngOnInit() {
    this.volunteerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      cpf: ['', [Validators.required, Validators.maxLength(14), cpfValidator()]],
      proposal: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
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
      try {
        const message = this.buildMessage();
        this.openWhatsApp(message);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro ao processar voluntariado';
        this.toastService.show(errorMessage, 'error');
        this.formHelperService.validateAllFormFields(this.volunteerForm);
      }
    } else {
      this.toastService.show('Por favor, preencha todos os campos obrigatórios', 'error');
      this.formHelperService.validateAllFormFields(this.volunteerForm);
    }
  }

  onlyLetters(event: KeyboardEvent) {
    const char = String.fromCharCode(event.keyCode || event.which);
    if (!/^[A-Za-zÀ-ÿ\s]$/.test(char)) {
      event.preventDefault();
    }
  }

  private buildMessage(): string {
    const { name, cpf, proposal, availability } = this.volunteerForm.value;

    if (!name || !cpf || !proposal) {
      this.toastService.show('Dados do formulário incompletos', 'error');
    }

    if (!availability || typeof availability !== 'object') {
      this.toastService.show('Dados de disponibilidade inválidos', 'error');
    }

    const selectedDays = this.days
      .map(day => {
        const periodValue = availability[day.key];
        const periodLabel = this.periods.find(p => p.value === periodValue)?.label;
        return periodValue ? `- ${day.label}: ${periodLabel}` : null;
      })
      .filter(Boolean)
      .join('\n');

    const availabilityMessage = selectedDays ? `\n\nDisponibilidade:\n${selectedDays}` : '';

    return (
      `Olá! Tenho interesse em ser voluntário(a).\n` +
      `Meu nome é ${name}.\nMeu CPF é ${cpf}.\n` +
      `Minha proposta de voluntariado é: ${proposal}${availabilityMessage}`
    );
  }

  private openWhatsApp(message: string): void {
    if (!message || typeof message !== 'string') {
      this.toastService.show('Mensagem inválida para envio', 'error');
      return;
    }

    try {
      this.whatsappService.openWhatsapp(message);
    } catch (error) {
      this.toastService.show('Não foi possível abrir o WhatsApp. Verifique sua conexão.', 'error');
    }
  }

  private availabilityValidator(group: AbstractControl): ValidationErrors | null {
    const hasAvailability = Object.values((group as FormGroup).controls).some(control => control.value);
    return hasAvailability ? null : { atLeastOneDayRequired: true };
  }
}
