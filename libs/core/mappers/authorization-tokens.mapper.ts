import { AuthorizationTokensDto } from '../dtos/authorization-tokens.dto';
import { AuthorizationTokens } from '../models/authorization-tokens';

export namespace AuthorizationTokensMapper {

	/**
	 * Map tokens from dto to model.
	 * @param tokens - Authorization tokens Dto.
	 * @returns Authorization tokens model.
	 */
	export function fromDto(tokens: AuthorizationTokensDto): AuthorizationTokens {
		return {
			refresh: tokens.refresh,
			access: tokens.access,
		};
	}
}
