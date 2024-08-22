import { User } from '@js-camp/core/models/user';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';

import { http } from '..';

const userUrl = 'users/profile/';

export namespace UserService {

	const errorObject = {
		avatar: null,
	};

	/**
	 * Get the current user based on the stored token.
	 * @returns Current user.
	 */
	export async function getCurrentUser(): Promise<User> {
		const { data } = await http.get<UserDto>(userUrl);
		if (JSON.stringify(data) === JSON.stringify(errorObject)) {
			throw new Error('Failed to get current user');
		}
		return UserMapper.fromDto(data);
	}
}
