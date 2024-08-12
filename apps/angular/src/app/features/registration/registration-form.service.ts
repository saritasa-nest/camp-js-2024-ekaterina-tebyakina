import { inject } from '@angular/core';
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

/** Registration form management service. */
export class RegistrationFormService {

	private readonly formBuilder = inject(NonNullableFormBuilder);

	/**
	 * Function for initializing registration form.
	 * @returns Registration form.
	 */
	public initialize(): FormGroup<RegistrationForm> {
		return this.formBuilder.group({
			email: this.formBuilder.control('', [Validators.required, Validators.email]),
			firstName: this.formBuilder.control('', [Validators.required]),
			lastName: this.formBuilder.control('', [Validators.required]),
			password: this.formBuilder.control('', [Validators.required]),
			retypedPassword: this.formBuilder.control('', [Validators.required]),
		}, { validators: matchFieldsValidator('password', 'retypedPassword') });
	}
}
