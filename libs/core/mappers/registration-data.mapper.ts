import { RegistrationDataDto } from '../dtos/registration-data.dto';
import { RegistrationData } from '../models/registration-data';

export namespace RegistrationDataMapper {

	/**
	 * Maps dto to model.
	 * @param registration - Data model for registration.
	 * @returns Data dto for registration.
	 */
	export function toDto(registration: RegistrationData): RegistrationDataDto {
		return {
			...(registration.avatar && { avatar: registration.avatar }),
			email: registration.email,
			first_name: registration.firstName,
			last_name: registration.lastName,
			password: registration.password,
		};
	}
}
