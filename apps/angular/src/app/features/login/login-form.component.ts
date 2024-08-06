import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthorizationApiService } from '@js-camp/angular/core/services/authorization-api.service';
import { tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';

import { ServerErrorDto } from '@js-camp/core/dtos/server-error.dto';
import { ServerErrorMapper } from '@js-camp/core/mappers/server-error.mapper';

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
export class LoginFormComponent {

	/** Form group for login form. */
	public readonly loginFormGroup: FormGroup<LoginForm>;

	private readonly authorizationApiService = inject(AuthorizationApiService);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly destroyRef = inject(DestroyRef);

	private readonly changeDetectorRef = inject(ChangeDetectorRef);

	private readonly router = inject(Router);

	public constructor() {
		this.loginFormGroup = LoginForm.initialize(this.formBuilder);
	}

	/** Handle login form submit. */
	protected onLoginSubmit(): void {

		const formData = this.loginFormGroup.getRawValue();

		this.authorizationApiService.login(formData).pipe(
			takeUntilDestroyed(this.destroyRef),
			tap({
				next: () => {
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

	private handleServerError(errorResponse: HttpErrorResponse): void {

		let errorsString = '';

		errorResponse.error.errors.forEach((errorDto: ServerErrorDto) => {
			const error = ServerErrorMapper.fromDto(errorDto);
			if (error.attribute && this.loginFormGroup.contains(error.attribute)) {
				this.loginFormGroup.controls[error.attribute as keyof LoginForm].setErrors({ serverError: error.detail });
				return;
			}
			errorsString += `${error.detail}\n`;
		});

		this.loginFormGroup.setErrors({ serverError: errorsString });
		this.changeDetectorRef.markForCheck();
	}
}
