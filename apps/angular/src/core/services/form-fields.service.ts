// import { Injectable } from '@angular/core';
// import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

// /** CompareFormFieldsServiceservice. */
// @Injectable({ providedIn: 'root' })
// export class FormFieldsService {

// 	/**
// 	 * AbstractControl.
// 	 * @param controlName AbstractControl.
// 	 * @param matchingControlName AbstractControl.
// 	 * @returns AbstractControl.
// 	 */
// 	public matchFieldsValidator(controlName: string, matchingControlName: string): ValidatorFn {
// 		return (formGroup: AbstractControl): { [key: string]: unknown; } | null => {
// 			const formGroupControl = formGroup as FormGroup;
// 			const control = formGroupControl.controls[controlName];
// 			const matchingControl = formGroupControl.controls[matchingControlName];

// 			if (!control || !matchingControl) {
// 				return null; // If the controls are not found, return null
// 			}

// 			// If the matching control has any error other than 'mustMatch', return and don't override it
// 			if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
// 				return null;
// 			}

// 			// Set error on matchingControl if validation fails
// 			if (control.value !== matchingControl.value) {
// 				matchingControl.setErrors({ mustMatch: true });
// 			} else {
// 				matchingControl.setErrors(null); // Clear the error if the values match
// 			}

// 			return null;
// 		};
// 	}
// }
