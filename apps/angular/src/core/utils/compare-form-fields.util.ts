import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

/**
 * AbstractControl.
 * @param controlName AbstractControl.
 * @param matchingControlName AbstractControl.
 * @returns AbstractControl.
 */
export function matchFieldsValidator(controlName: string, matchingControlName: string): ValidatorFn {
	return (formGroup: AbstractControl): { [key: string]: unknown; } | null => {
		const formGroupControl = formGroup as FormGroup;
		const control = formGroupControl.controls[controlName];
		const matchingControl = formGroupControl.controls[matchingControlName];

		if (!control || !matchingControl) {
			return null;
		}

		if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
			return null;
		}

		if (control.value !== matchingControl.value) {
			matchingControl.setErrors({ mustMatch: true });
		} else {
			matchingControl.setErrors(null);
		}

		return null;
	};
}
