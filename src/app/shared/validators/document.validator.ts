import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const cpf = value.replace(/\D/g, '');

    if (cpf.length !== 11) {
      return { document: true };
    }

    if (/^(\d)\1+$/.test(cpf)) {
      return { document: true };
    }

    const calcCheckDigit = (base: string, factor: number) => {
      let sum = 0;
      for (let i = 0; i < base.length; i++) {
        sum += parseInt(base.charAt(i), 10) * factor--;
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const digit1 = calcCheckDigit(cpf.substring(0, 9), 10);
    const digit2 = calcCheckDigit(cpf.substring(0, 10), 11);

    if (
      digit1 !== parseInt(cpf.charAt(9), 10) ||
      digit2 !== parseInt(cpf.charAt(10), 10)
    ) {
      return { document: true };
    }

    return null;
  };
}
