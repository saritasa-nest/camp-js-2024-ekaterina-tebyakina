import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Registration } from '@js-camp/core/models/registration';
import { AuthorizationApiService } from '@js-camp/angular/core/services/authorization-api.service';

import { Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerError } from '@js-camp/core/dtos/server-error.dto';

import { RegistrationForm } from './registration-form-model';

/** Component with form for registration. */
@Component({
	selector: 'camp-registration-form',
	standalone: true,
	templateUrl: './registration-form.component.html',
	styleUrl: './registration-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
	],
})
export class RegistrationFormComponent implements OnInit, OnDestroy {

	/** Form group for anime filter form. */
	public registrationFormGroup?: FormGroup<RegistrationForm>;

	private authorizationApiService = inject(AuthorizationApiService);

	private registrationSubscription?: Subscription;

	private readonly router = inject(Router);

	public constructor(private readonly formBuilder: NonNullableFormBuilder, private cdr: ChangeDetectorRef) {}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.registrationFormGroup = RegistrationForm.initialize({
			formBuilder: this.formBuilder,
		});
	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		if (this.registrationSubscription) {
			this.registrationSubscription.unsubscribe();
		}
	}

	/** Handle login submit. */
	protected onRegistrationSubmit(): void {

		if (this.registrationFormGroup) {

			const formData = this.registrationFormGroup.getRawValue();

			const registrationData = new Registration({
				email: formData.email,
				firstName: formData.firstName,
				lastName: formData.lastName,
				password: formData.password,
			});

			this.registrationSubscription = this.authorizationApiService.register(registrationData).pipe(
				tap({
					next: response => {
						this.authorizationApiService.saveTokens(response);
						this.router.navigate(['']);
					},
					error: (error: unknown) => {
						console.warn(error);
						if (error instanceof HttpErrorResponse) {
							this.handleServerError(error);
						}
					},
				}),
			)
				.subscribe();
		}
	}

	private handleServerError(errorResponse: HttpErrorResponse): void {

		if (errorResponse.error.errors && this.registrationFormGroup) {

			const errorsList = errorResponse.error.errors;
			let errorsString = '';

			errorsList.forEach((error: ServerError) => {
				if (error.attr && this.registrationFormGroup?.contains(error.attr)) {
					this.registrationFormGroup.controls[error.attr as keyof RegistrationForm].setErrors({ serverError: error.detail });
					return;
				}
				errorsString += `${error.detail}\n`;
			});

			this.registrationFormGroup.setErrors({ serverError: errorsString });
			this.cdr.markForCheck();

		} else {
			const serverErrorMessage = errorResponse.error.message || 'Login failed. Please try again.';
			this.registrationFormGroup?.setErrors({ serverError: serverErrorMessage });
			this.cdr.markForCheck();
		}
	}

}
