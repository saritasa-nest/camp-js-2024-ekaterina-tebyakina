import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	standalone: true,
	imports: [RouterModule, MatToolbarModule],
})
export class AppComponent {}
