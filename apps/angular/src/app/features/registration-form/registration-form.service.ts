import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormControl, NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchFieldsValidator } from '@js-camp/angular/core/utils/compare-form-fields.util';
import { capitalize } from '@js-camp/angular/core/utils/strings-modification.util';
import { ServerError } from '@js-camp/core/models/server-error';

/** Type for registration form group. Contains types for each control. */
type RegistrationForm = {

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
@Injectable({ providedIn: 'root' })
export class RegistrationFormService {

	/** Form group for registration form. */
	public readonly form: FormGroup<RegistrationForm>;

	private readonly formBuilder = inject(NonNullableFormBuilder);

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

		if (control) {
			if (control.hasError('required') && control.touched) {
				return `${capitalize(controlName)} is required.`;
			} else if (control.hasError('email') && control.touched) {
				return 'Enter a valid email address.';
			} else if (control.hasError('serverError') && control.touched) {
				return control.getError('serverError');
			} else if (control.hasError('mustMatch') && control.touched) {
				return 'Passwords must match.';
			}
		}

		return null;
	}
}
