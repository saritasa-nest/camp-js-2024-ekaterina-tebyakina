import { RegistrationDto } from '../dtos/registration.dto';
import { Registration } from '../models/registration';

export namespace RegistrationMapper {

	/**
	 * Maps dto to model.
	 * @param registration Registration model.
	 * @returns Registration dto.
	 */
	export function toDto(registration: Registration): RegistrationDto {
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
