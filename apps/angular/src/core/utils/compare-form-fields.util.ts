import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * A function that create validator that checks the value of two controls for equality.
 * @param matchingControl - Control for comparison.
 * @returns Validator function.
 */
export function matchFieldsValidator(matchingControl: AbstractControl): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => control.value !== matchingControl.value ? { mustMatch: true } : null;
}
