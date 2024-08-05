import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthorizationApiService } from '@js-camp/angular/core/services/authorization-api.service';
import { Subscription, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';

import { ServerError } from '@js-camp/core/dtos/server-error.dto';

import { LoginForm } from './login-form-model';

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
export class LoginFormComponent implements OnInit, OnDestroy {

	/** Form group for anime filter form. */
	public loginFormGroup?: FormGroup<LoginForm>;

	private authorizationApiService = inject(AuthorizationApiService);

	private loginSubscription?: Subscription;

	private readonly router = inject(Router);

	public constructor(private readonly formBuilder: NonNullableFormBuilder, private cdr: ChangeDetectorRef) {}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.loginFormGroup = LoginForm.initialize({
			formBuilder: this.formBuilder,
		});
	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		if (this.loginSubscription) {
			this.loginSubscription.unsubscribe();
		}
	}

	/** Handle login submit. */
	protected onLoginSubmit(): void {

		if (this.loginFormGroup) {

			const formData = this.loginFormGroup.getRawValue();

			this.loginSubscription = this.authorizationApiService.login(formData).pipe(
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

		if (errorResponse.error.errors && this.loginFormGroup) {

			const errorsList = errorResponse.error.errors;
			let errorsString = '';

			errorsList.forEach((error: ServerError) => {
				if (error.attr && this.loginFormGroup?.contains(error.attr)) {
					this.loginFormGroup.controls[error.attr as keyof LoginForm].setErrors({ serverError: error.detail });
					return;
				}
				errorsString += `${error.detail}\n`;
			});

			this.loginFormGroup.setErrors({ serverError: errorsString });
			this.cdr.markForCheck();

		} else {
			const serverErrorMessage = errorResponse.error.message || 'Login failed. Please try again.';
			this.loginFormGroup?.setErrors({ serverError: serverErrorMessage });
			this.cdr.markForCheck();
		}
	}
}
