import { FormControl, NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';

/** Type for login form group. Contains types for each control. */
export type LoginForm = {

	/** Type of form control for email. */
	readonly email: FormControl<string>;

	/** Type of form control for password. */
	readonly password: FormControl<string>;
};

export namespace LoginForm {

	/**
	 * Function for initializing login form.
	 * @param formBuilder - From builder for form.
	 * @returns Login form.
	 */
	export function initialize(formBuilder: NonNullableFormBuilder): FormGroup<LoginForm> {
		return formBuilder.group({
			email: formBuilder.control('', [Validators.required, Validators.email]),
			password: formBuilder.control('', [Validators.required]),
		});
	}
}