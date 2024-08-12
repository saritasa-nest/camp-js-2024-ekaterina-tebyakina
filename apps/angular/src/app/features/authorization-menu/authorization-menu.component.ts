import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserApiService } from '@js-camp/angular/core/services/users-api.service';
import { BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { AuthorizationApiService } from '@js-camp/angular/core/services/authorization-api.service';
import { LocalStorageService } from '@js-camp/angular/core/services/local-storage.service';
import { RouterPaths } from '@js-camp/angular/core/model/router-paths';

/** Component with authorization navigation menu. */
@Component({
	selector: 'camp-authorization-menu-form',
	standalone: true,
	templateUrl: './authorization-menu.component.html',
	styleUrl: './authorization-menu.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		RouterLink,
		AsyncPipe,
	],
})
export class AuthorizationMenuComponent implements OnInit {

	/** Shows whether the user is logged in. */
	public isLoggedIn$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

	/** Enum with paths for link. */
	protected readonly routerPaths = RouterPaths;

	private readonly usersApiService = inject(UserApiService);

	private readonly authApiService = inject(AuthorizationApiService);

	private readonly localStorageService = inject(LocalStorageService);

	private readonly destroyRef = inject(DestroyRef);

	private readonly router = inject(Router);

	/** @inheritdoc */
	public ngOnInit(): void {
		this.localStorageService.onTokenChange().pipe(
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe(() => {
				this.updateIsLoggedIn();
			});

		this.updateIsLoggedIn();
	}

	/** Handle click on log out button. */
	protected onLogoutClick(): void {
		this.authApiService.logout();
		this.router.navigate([this.routerPaths.Login]);
	}

	/** Updates the value of the isLoggedIn subject. */
	private updateIsLoggedIn(): void {
		this.usersApiService.getCurrentUser().pipe(
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe({
				next: () => {
					this.isLoggedIn$.next(true);
				},
				error: () => {
					this.isLoggedIn$.next(false);
				},
			});
	}
}