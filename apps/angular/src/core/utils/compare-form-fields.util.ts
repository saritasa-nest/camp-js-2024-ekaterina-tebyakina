import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * A function that create validator that checks the value of two controls for equality.
 * @param controlName - Name of the first control.
 * @param matchingControlName - Name of the second control.
 * @returns Validator function.
 */
export function matchFieldsValidator(controlName: string, matchingControlName: string): ValidatorFn {
	return (formGroup: AbstractControl): ValidationErrors | null => {
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
