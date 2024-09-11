import { RegistrationData } from '@js-camp/core/models/registration-data';
import { RegistrationDataMapper } from '@js-camp/core/mappers/registration-data.mapper';
import { AuthorizationTokens } from '@js-camp/core/models/authorization-tokens';
import { AuthorizationTokensDto } from '@js-camp/core/dtos/authorization-tokens.dto';
import { AuthorizationTokensMapper } from '@js-camp/core/mappers/authorization-tokens.mapper';
import { LoginData } from '@js-camp/core/models/login-data';
import { LoginDataMapper } from '@js-camp/core/mappers/login-data.mapper';

import { http } from '..';

import { UrlConfigService } from './urlConfigService';

export namespace AuthorizationService {

	/**
	 * Login the user and receives authorization tokens.
	 * @param loginData - User's data for login.
	 * @returns - Authorization tokens.
	 */
	export async function login(loginData: LoginData): Promise<AuthorizationTokens> {
		const { data } = await http.post<AuthorizationTokensDto>(
			UrlConfigService.authorizationUrls.login,
			LoginDataMapper.toDto(loginData),
		);
		return AuthorizationTokensMapper.fromDto(data);
	}

	/**
	 * Registers the user and receives authorization tokens.
	 * @param registrationData - User's data for registration.
	 * @returns - Authorization tokens.
	 */
	export async function register(registrationData: RegistrationData): Promise<AuthorizationTokens> {
		const { data } = await http.post<AuthorizationTokensDto>(
			UrlConfigService.authorizationUrls.register,
			RegistrationDataMapper.toDto(registrationData),
		);
		return AuthorizationTokensMapper.fromDto(data);
	}

	/**
	 * Refresh access token with refresh token.
	 * @param refreshToken - Token for refreshing access token.
	 * @returns - Authorization tokens.
	 */
	export async function refreshAccessToken(refreshToken: string): Promise<AuthorizationTokens> {
		const { data } = await http.post<AuthorizationTokensDto>(
			UrlConfigService.authorizationUrls.refreshToken,
			{
				refresh: refreshToken,
			},
		);
		return AuthorizationTokensMapper.fromDto(data);
	}
}
