import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function celularValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const telefone = value.replace(/\D/g, '');

    if (telefone.length !== 11) {
      return { phone: true };
    }

    if (telefone[2] !== '9') {
      return { phone: true };
    }

    if (/^(\d)\1+$/.test(telefone)) {
      return { phone: true };
    }

    return null;
  };
}
