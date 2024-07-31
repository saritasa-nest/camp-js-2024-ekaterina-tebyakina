import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

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
	],
})
export class AppComponent {}
