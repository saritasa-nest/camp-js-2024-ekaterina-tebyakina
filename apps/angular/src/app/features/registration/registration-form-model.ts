import { FormControl, NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchFieldsValidator } from '@js-camp/angular/core/utils/compare-form-fields.util';

/** Type for registration form group. Contains types for each control. */
export type RegistrationForm = {

	/** Type of form control for email. */
	readonly email: FormControl<string>;

	/** Type of form control for first name. */
	readonly firstName: FormControl<string>;

	/** Type of form control for last name. */
	readonly lastName: FormControl<string>;

	/** Type of form control for password. */
	readonly password: FormControl<string>;

	/** Type of form control for retyped password. */
	readonly retypedPassword: FormControl<string>;
};

export namespace RegistrationForm {

	/**
	 * Function for initializing registration form.
	 * @param formBuilder - From builder for form.
	 * @returns Registration form.
	 */
	export function initialize(formBuilder: NonNullableFormBuilder): FormGroup<RegistrationForm> {
		return formBuilder.group({
			email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
			firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
			lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
			password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
			retypedPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		}, { validators: matchFieldsValidator('password', 'retypedPassword') });
	}
}
