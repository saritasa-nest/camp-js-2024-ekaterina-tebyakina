import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthorizationApiService } from '@js-camp/angular/core/services/authorization-api.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

/** */
export type Error = {

	/** */
	attr: string | null;

	/** */
	code: string;

	/** */
	detail: string;
};

/** Component with form for authorization. */
@Component({
	selector: 'camp-login-form',
	standalone: true,
	templateUrl: './login-form.component.html',
	styleUrl: './login-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
	],
})
export class LoginFormComponent implements OnDestroy {

	private authorizationApiService = inject(AuthorizationApiService);

	private subscriptions: Subscription[] = [];

	/** @inheritdoc */
	public ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => {
			subscription.unsubscribe();
		});
	}

	/** Form for login. */
	protected loginForm = new FormGroup({
		email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
		password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
	});

	/** Handle login submit. */
	protected onLoginSubmit(): void {
		const formData = this.loginForm.getRawValue();

		this.subscriptions.push(
			this.authorizationApiService.login(formData)
				.subscribe({
					next: response => {
						console.log('Login successful:', response);
						this.authorizationApiService.saveTokens(response);
					},
					error: (error: unknown) => {
						if (error instanceof HttpErrorResponse) {
							console.log('Login failed:', error.error.errors);
							this.handleServerError(error);
						}
					},
				}),
		);
	}

	private handleServerError(errorResponse: HttpErrorResponse): void {
		console.log('HttpErrorResponse', errorResponse);
		if (errorResponse.status !== 200 && errorResponse.error.errors) {
			// Handle field-specific errors
			console.log('Login failed:', errorResponse);

			const errorsList = errorResponse.error.errors;

			let errorsString = '';

			errorsList.forEach((error: Error) => {
				errorsString += `${error.detail}\n`;
			});

			this.loginForm.setErrors({ serverError: errorsString });
			this.loginForm.markAllAsTouched();
			this.loginForm.markAsDirty();
			console.log(this.loginForm.getError('serverError'));
			console.log('subs', this.subscriptions);

			// if (formControl) {
			// 	formControl.setErrors({ serverError: fieldError.message });
			// }

			// for (const fieldError of error.error.fieldErrors) {
			// 	const formControl = this.loginForm.get(fieldError.field);
			// 	if (formControl) {
			// 		formControl.setErrors({ serverError: fieldError.message });
			// 	}
			// }
		} else {
			// General error handling
			const serverErrorMessage = errorResponse.error.message || 'Registration failed. Please try again.';
			this.loginForm.setErrors({ serverError: serverErrorMessage });
			this.loginForm.markAllAsTouched();
		}
	}
}
