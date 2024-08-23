import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormControl, NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchFieldsValidator } from '@js-camp/angular/core/utils/compare-form-fields.util';
import { ServerError } from '@js-camp/core/models/server-error';

/** Type for registration form group. Contains types for each control. */
type RegistrationForm = {

	/** Email. */
	readonly email: FormControl<string>;

	/** First name. */
	readonly firstName: FormControl<string>;

	/** Last name. */
	readonly lastName: FormControl<string>;

	/** Password. */
	readonly password: FormControl<string>;

	/** Retyped password. */
	readonly retypedPassword: FormControl<string>;
};

/** Registration form management service. */
@Injectable({ providedIn: 'root' })
export class RegistrationFormService {

	/** Form group for registration form. */
	public readonly form: FormGroup<RegistrationForm>;

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly errors = {
		required: 'This field is required.',
		email: 'Enter a valid email address.',
		mustMatch: 'Passwords must match.',
	};

	public constructor() {
		this.form = this.initialize();
	}

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

	/**
	 * Function for setting errors from server to form.
	 * @param errorResponse - Server error object.
	 */
	public handleServerError(errorResponse: HttpErrorResponse): void {
		let errorsString = '';

		errorResponse.error.errors.forEach((error: ServerError) => {
			if (error.attribute && this.form.contains(error.attribute)) {
				this.form.controls[error.attribute as keyof RegistrationForm]
					.setErrors({ serverError: error.detail });
				return;
			}
			errorsString += `${error.detail}\n`;
		});

		this.form.setErrors({ serverError: errorsString });
	}

	/**
	 * Function for getting an error message for form control.
	 * @param controlName - Name of form control.
	 */
	public getErrorMessage(controlName: string): string | null {
		const control = this.form.get(controlName);

		for (const [errorName, errorMessage] of Object.entries(this.errors)) {
			if (control && control.hasError(errorName) && control.touched) {
				return errorMessage;
			}
		}

		if (control && control.hasError('serverError') && control.touched) {
			return control.getError('serverError');
		}

		return null;
	}
}
