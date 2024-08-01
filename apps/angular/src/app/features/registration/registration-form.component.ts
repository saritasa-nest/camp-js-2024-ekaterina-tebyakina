import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormFieldsService } from '@js-camp/angular/core/services/form-fields.service';
import { Registration } from '@js-camp/core/models/registration';
import { AuthorizationApiService } from '@js-camp/angular/core/services/authorization-api.service';

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
		MatInputModule,
		MatButtonModule,
	],
})
export class RegistrationFormComponent {

	private formFieldsService = inject(FormFieldsService);

	private authorizationApiService = inject(AuthorizationApiService);

	/** Form for registration. */
	protected registrationForm = new FormGroup({
		email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
		firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		retypedPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
	}, { validators: this.formFieldsService.matchFieldsValidator('password', 'retypedPassword') });

	/** */
	protected onRegistrationSubmit(): void {
		const formData = this.registrationForm.getRawValue();

		const registrationData = new Registration({
			email: formData.email,
			firstName: formData.firstName,
			lastName: formData.lastName,
			password: formData.password,
		});
		this.authorizationApiService.register(registrationData);
	}

}
