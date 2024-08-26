import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user';

/** Map user model and dto. */
export namespace UserMapper {

	/**
	 * Maps user data dto to model.
	 * @param user - User dto.
	 * @returns User model.
	 */
	export function fromDto(user: UserDto): User {
		return new User({
			email: user.email,
			firstName: user.first_name,
			lastName: user.last_name,
			avatar: user.avatar,
			created: new Date(user.created),
			modified: new Date(user.modified),
		});
	}
}
