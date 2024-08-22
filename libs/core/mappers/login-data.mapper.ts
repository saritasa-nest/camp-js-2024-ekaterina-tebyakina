import { LoginDataDto } from '../dtos/login-data.dto';
import { LoginData } from '../models/login-data';

export namespace LoginDataMapper {

	/**
	 * Maps dto to model.
	 * @param loginData User data model for log in.
	 * @returns User data dto for log in.
	 */
	export function toDto(loginData: LoginData): LoginDataDto {
		return {
			email: loginData.email,
			password: loginData.password,
		};
	}
}
