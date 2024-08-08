import { Component, Inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { DialogRef, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';

/** */
export type DialogData = {

	/** */
	src: string;

	/** */
	alt: string;
};

/** */
@Component({
	selector: 'camp-dialog',
	templateUrl: 'dialog.component.html',
	styleUrl: 'dialog.component.css',
	standalone: true,
	imports: [FormsModule, DialogModule, NgOptimizedImage],
})
export class DialogComponent {

	public constructor(
		public dialogRef: DialogRef<string>,
		@Inject(DIALOG_DATA) public data: DialogData,
	) {}
}
