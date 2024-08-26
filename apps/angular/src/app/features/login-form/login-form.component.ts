import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthorizationApiService } from '@js-camp/angular/core/services/authorization-api.service';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterPaths } from '@js-camp/angular/core/model/router-paths';
import { LoginData } from '@js-camp/core/models/login-data';

import { LoginFormService } from './login-form.service';

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

	/** Enum with paths for link. */
	protected readonly routerPaths = RouterPaths;

	/** Login form management service. */
	protected readonly loginFormService = inject(LoginFormService);

	private readonly authorizationApiService = inject(AuthorizationApiService);

	private readonly destroyRef = inject(DestroyRef);

	private readonly changeDetectorRef = inject(ChangeDetectorRef);

	private readonly router = inject(Router);

	/** Handle login form submit. */
	protected onLoginSubmit(): void {

		if (this.loginFormService.form.invalid) {
			return;
		}

		const formData = new LoginData(this.loginFormService.form.getRawValue());

		this.authorizationApiService.login(formData).pipe(
			takeUntilDestroyed(this.destroyRef),
			catchError((error: unknown) => {
				if (error instanceof HttpErrorResponse) {
					this.loginFormService.handleServerError(error);
					this.changeDetectorRef.markForCheck();
				}
				return throwError(() => error);
			}),
			tap(() => {
				this.loginFormService.form.reset();
				this.router.navigate([this.routerPaths.Main]);
			}),
		)
			.subscribe();

	}
}
