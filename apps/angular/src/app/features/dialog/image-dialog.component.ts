import { Component, Inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { DialogRef, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';

/** Type of data for dialog. */
type DialogData = {

	/** Image url. */
	src: string;

	/** String for image alt. */
	alt: string;
};

/** Popup for anime cover. */
@Component({
	selector: 'camp-image-dialog',
	templateUrl: 'image-dialog.component.html',
	styleUrl: 'image-dialog.component.css',
	standalone: true,
	imports: [FormsModule, DialogModule, NgOptimizedImage],
})
export class ImageDialogComponent {

	public constructor(
		public dialogRef: DialogRef<string>,
		@Inject(DIALOG_DATA) public data: DialogData,
	) {}
}
