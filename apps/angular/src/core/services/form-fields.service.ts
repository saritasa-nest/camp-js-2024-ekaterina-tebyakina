import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

/** CompareFormFieldsServiceservice. */
@Injectable({ providedIn: 'root' })
export class FormFieldsService {

	/**
	 * AbstractControl.
	 * @param formField AbstractControl.
	 * @param anotherFormField AbstractControl.
	 * @returns AbstractControl.
	 */
	public matchFieldsValidator(formField: string, anotherFormField: string): ValidatorFn {
		return (control: AbstractControl): { [key: string]: boolean; } | null => {
			const formFieldControl = control.get(formField);
			const anotherFormFieldControl = control.get(anotherFormField);

			if (!formFieldControl || !anotherFormFieldControl) {
				return null;
			}

			// Check if the passwords do not match
			if (formFieldControl.value !== anotherFormFieldControl.value) {
				// Set the error on the retypedPassword control
				formFieldControl.setErrors({ mustMatch: true });
				anotherFormFieldControl.setErrors({ mustMatch: true });
				return { mustMatch: true };
			}

			// Clear the error if the passwords match
			formFieldControl.setErrors(null);
			anotherFormFieldControl.setErrors(null);
			return null;

		};
	}
}
