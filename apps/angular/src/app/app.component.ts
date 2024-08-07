import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

import { RouterPaths } from '../core/model/router-paths';

import { AuthorizationMenuComponent } from './features/authorization-menu/authorization-menu.component';

/** Main component of application. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	standalone: true,
	imports: [
		MatToolbarModule,
		RouterModule,
		RouterLink,
		AuthorizationMenuComponent,
	],
})
export class AppComponent {

	/** Enum with paths for link. */
	protected readonly routerPaths = RouterPaths;
}
