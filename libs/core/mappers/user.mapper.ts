import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user';

export namespace UserMapper {

	/**
	 * Maps dto to model.
	 * @param user Genre dto.
	 * @returns Genre model.
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
