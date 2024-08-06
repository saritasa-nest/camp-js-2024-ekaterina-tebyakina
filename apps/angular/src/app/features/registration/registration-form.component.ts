import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Registration } from '@js-camp/core/models/registration';
import { AuthorizationApiService } from '@js-camp/angular/core/services/authorization-api.service';

import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ServerErrorMapper } from '@js-camp/core/mappers/server-error.mapper';
import { ServerErrorDto } from '@js-camp/core/dtos/server-error.dto';

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
export class RegistrationFormComponent {

	/** Form group for registration form. */
	public readonly registrationFormGroup: FormGroup<RegistrationForm>;

	private readonly authorizationApiService = inject(AuthorizationApiService);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly router = inject(Router);

	private readonly destroyRef = inject(DestroyRef);

	private readonly changeDetectorRef = inject(ChangeDetectorRef);

	public constructor() {
		this.registrationFormGroup = RegistrationForm.initialize(this.formBuilder);
	}

	/** Handle registration submit. */
	protected onRegistrationSubmit(): void {

		const formData = this.registrationFormGroup.getRawValue();

		const registrationData = new Registration({
			email: formData.email,
			firstName: formData.firstName,
			lastName: formData.lastName,
			password: formData.password,
		});

		this.authorizationApiService.register(registrationData).pipe(
			takeUntilDestroyed(this.destroyRef),
			tap({
				next: () => {
					this.router.navigate(['']);
				},
				error: (error: unknown) => {
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
			if (error.attribute && this.registrationFormGroup?.contains(error.attribute)) {
				this.registrationFormGroup.controls[error.attribute as keyof RegistrationForm].setErrors({ serverError: error.detail });
				return;
			}
			errorsString += `${error.detail}\n`;
		});

		this.registrationFormGroup.setErrors({ serverError: errorsString });
		this.changeDetectorRef.markForCheck();
	}

}
