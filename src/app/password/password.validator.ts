import { AbstractControl, ValidatorFn } from '@angular/forms';
import { PasswordColors as C } from './password.model';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: C } => {
    const value = control.value;
    const hasLetters = /[a-zA-Z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSymbols = /\W/.test(value);

    if (value.length < 8 && value.length !== 0) {
      return { strength: C.RED };
    } else if (value.length === 0) {
      return { strength: C.GRAY };
    } else if (hasLetters && hasNumbers && hasSymbols) {
      return { strength: C.GREEN };
    } else if (
      (hasLetters && hasNumbers) ||
      (hasLetters && hasSymbols) ||
      (hasNumbers && hasSymbols)
    ) {
      return { strength: C.YELLOW };
    } else {
      return { strength: C.RED };
    }
  };
}
