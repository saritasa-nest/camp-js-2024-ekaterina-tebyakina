import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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

	protected readonly routerPaths = RouterPaths;

	private readonly usersApiService = inject(UserApiService);

	private readonly authApiService = inject(AuthorizationApiService);

	private readonly localStorageService = inject(LocalStorageService);

	private readonly destroyRef = inject(DestroyRef);

	/** @inheritdoc */
	public ngOnInit(): void {
		this.localStorageService.onTokenChange().pipe(
			takeUntilDestroyed(this.destroyRef),
		).subscribe(() => {
			this.updateHeaderLinks();
		});

		this.updateHeaderLinks();
	}

	/** Handle click on log out button. */
	protected onLogoutClick(): void {
		this.authApiService.logout();
	}

	private updateHeaderLinks(): void {
		this.usersApiService.getCurrentUser().pipe(
			takeUntilDestroyed(this.destroyRef),
		).subscribe({
			next: () => {
				this.isLoggedIn$.next(true);
			},
			error: err => {
				console.error('Error fetching user:', err);
				this.isLoggedIn$.next(false);
			}
		});
	}
}