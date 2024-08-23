import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserApiService } from '@js-camp/angular/core/services/users-api.service';
import { AsyncPipe } from '@angular/common';
import { AuthorizationApiService } from '@js-camp/angular/core/services/authorization-api.service';
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
export class AuthorizationMenuComponent {

	/** Enum with paths for link. */
	protected readonly routerPaths = RouterPaths;

	/** Service for managing current user. */
	protected readonly usersApiService = inject(UserApiService);

	private readonly authApiService = inject(AuthorizationApiService);

	/** Handle click on log out button. */
	protected onLogoutClick(): void {
		this.authApiService.logout();
	}
}
