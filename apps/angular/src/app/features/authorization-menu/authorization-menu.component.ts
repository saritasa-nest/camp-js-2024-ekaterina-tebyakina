import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserApiService } from '@js-camp/angular/core/services/users-api.service';
import { AsyncPipe } from '@angular/common';
import { AuthorizationApiService } from '@js-camp/angular/core/services/authorization-api.service';
import { RouterPaths } from '@js-camp/angular/core/model/router-paths';

/** Component with authorization navigation menu. */
@Component({
	selector: 'camp-authorization-menu',
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

	private readonly authApiService = inject(AuthorizationApiService);

	private readonly usersApiService = inject(UserApiService);

	/** Enum with paths for link. */
	protected readonly routerPaths = RouterPaths;

	/** Contains information about current user. */
	protected readonly user$ = this.usersApiService.user$;

	/** Handle click on log out button. */
	protected onLogoutClick(): void {
		this.authApiService.logout();
	}
}
