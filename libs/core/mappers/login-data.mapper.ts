import { LoginDataDto } from '../dtos/login-data.dto';
import { LoginData } from '../models/login-data';

export namespace LoginDataMapper {

	/**
	 * Maps dto to model.
	 * @param loginData User data for log in model.
	 * @returns User data for log in dto.
	 */
	export function toDto(loginData: LoginData): LoginDataDto {
		return {
			email: loginData.email,
			password: loginData.password,
		};
	}
}
