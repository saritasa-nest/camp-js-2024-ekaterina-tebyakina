import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormControl, NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerError } from '@js-camp/core/models/server-error';

/** Type for login form group. Contains types for each control. */
type LoginForm = {

	/** Type of form control for email. */
	readonly email: FormControl<string>;

	/** Type of form control for password. */
	readonly password: FormControl<string>;
};

/** Login form management service. */
@Injectable({ providedIn: 'root' })
export class LoginFormService {

	/** Form group for login form. */
	public readonly form: FormGroup<LoginForm>;

	private readonly formBuilder = inject(NonNullableFormBuilder);

	public constructor() {
		this.form = this.initialize();
	}

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

	/**
	 * Function for setting errors from server to form.
	 * @param errorResponse - Server error object.
	 */
	public handleServerError(errorResponse: HttpErrorResponse): void {

		let errorsString = '';

		errorResponse.error.errors.forEach((error: ServerError) => {
			if (error.attribute && this.form.contains(error.attribute)) {
				this.form.controls[error.attribute as keyof LoginForm].setErrors({ serverError: error.detail });
				return;
			}
			errorsString += `${error.detail}\n`;
		});

		this.form.setErrors({ serverError: errorsString });
	}
}
