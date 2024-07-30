import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/** Shows that the loading process is in progress. */
@Component({
	selector: 'camp-progress-bar',
	standalone: true,
	templateUrl: './progress-bar.component.html',
	imports: [MatProgressBarModule],
})
export class ProgressBarComponent {}
