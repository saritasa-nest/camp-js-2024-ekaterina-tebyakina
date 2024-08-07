import { RegistrationDataDto } from '../dtos/registration-data.dto';
import { RegistrationData } from '../models/registration-data';

export namespace RegistrationDataMapper {

	/**
	 * Maps dto to model.
	 * @param registration Data model for registration.
	 * @returns Data dto for registration.
	 */
	export function toDto(registration: RegistrationData): RegistrationDataDto {
		// Disable eslint because these properties must be written in snake case.
		return {
			email: registration.email,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			first_name: registration.firstName,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			last_name: registration.lastName,
			password: registration.password,
		};
	}
}
