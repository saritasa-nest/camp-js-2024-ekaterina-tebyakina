import { Component, inject } from '@angular/core';
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

/** Popup with full-size image. */
@Component({
	selector: 'camp-image-dialog',
	templateUrl: 'image-dialog.component.html',
	styleUrl: 'image-dialog.component.css',
	standalone: true,
	imports: [FormsModule, DialogModule, NgOptimizedImage],
})
export class ImageDialogComponent {
	/** Reference to the dialog. */
	protected readonly dialogRef = inject(DialogRef<string>);

	/** Data to be displayed in the dialog. */
	protected readonly data = inject<DialogData>(DIALOG_DATA);
}
