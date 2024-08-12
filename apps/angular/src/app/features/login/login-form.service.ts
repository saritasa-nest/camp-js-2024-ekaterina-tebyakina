import { inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';

/** Type for login form group. Contains types for each control. */
export type LoginForm = {

	/** Type of form control for email. */
	readonly email: FormControl<string>;

	/** Type of form control for password. */
	readonly password: FormControl<string>;
};

/** Login form management service. */
export class LoginFormService {

	private readonly formBuilder = inject(NonNullableFormBuilder);

	/**
	 * Function for initializing login form.
	 * @returns Login form.
	 */
	public initialize(): FormGroup<LoginForm> {
		return this.formBuilder.group({
			email: this.formBuilder.control('', [Validators.required, Validators.email]),
			password: this.formBuilder.control('', [Validators.required]),
		});
	}
}
