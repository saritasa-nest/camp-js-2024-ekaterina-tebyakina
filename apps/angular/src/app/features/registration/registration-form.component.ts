import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormFieldsService } from '@js-camp/angular/core/services/form-fields.service';

/** Component with form for registration. */
@Component({
	selector: 'camp-registration-form',
	standalone: true,
	templateUrl: './registration-form.component.html',
	styleUrl: './registration-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatButtonModule,
	],
})
export class RegistrationFormComponent {

	private readonly formFieldsService = inject(FormFieldsService);

	/** Form for registration. */
	public registrationForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		firstName: new FormControl('', [Validators.required]),
		lastName: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
		retypedPassword: new FormControl('', [Validators.required]),
	}, { validators: this.formFieldsService.matchFieldsValidator('password', 'retypedPassword') });

	/** */
	protected onRegistrationSubmit(): void {
		console.warn(this.registrationForm.value);
	}

}
