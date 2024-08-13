import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegistrationData } from '@js-camp/core/models/registration-data';
import { AuthorizationApiService } from '@js-camp/angular/core/services/authorization-api.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterPaths } from '@js-camp/angular/core/model/router-paths';

import { RegistrationFormService } from './registration-form.service';

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

	/** Enum with paths for link. */
	protected readonly routerPaths = RouterPaths;

	/** Registration form management service. */
	protected readonly registrationFormService = inject(RegistrationFormService);

	private readonly authorizationApiService = inject(AuthorizationApiService);

	private readonly router = inject(Router);

	private readonly destroyRef = inject(DestroyRef);

	private readonly changeDetectorRef = inject(ChangeDetectorRef);

	/** Handle registration submit. */
	protected onRegistrationSubmit(): void {

		const formData = new RegistrationData(this.registrationFormService.form.getRawValue());

		this.authorizationApiService.register(formData).pipe(
			takeUntilDestroyed(this.destroyRef),
			tap({
				next: () => {
					this.router.navigate([this.routerPaths.Main]);
				},
				error: (error: unknown) => {
					if (error instanceof HttpErrorResponse) {
						this.registrationFormService.handleServerError(error);
						this.changeDetectorRef.markForCheck();
					}
				},
			}),
		)
			.subscribe();

	}
}
