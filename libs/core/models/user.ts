import { Immerable, OmitImmerable } from './immerable';

/** User. */
export class User extends Immerable {

	/** User's email. */
	public readonly email: string;

	/** User's first name. */
	public readonly firstName: string;

	/** User's last name. */
	public readonly lastName: string;

	/** User's avatar. */
	public readonly avatar: string;

	/** Date the profile was created. */
	public readonly created: Date;

	/** Date of the last profile modification. */
	public readonly modified: Date;

	public constructor(data: GenreConstructorData) {
		super();
		this.email = data.email;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.avatar = data.avatar;
		this.created = data.created;
		this.modified = data.modified;
	}
}

type GenreConstructorData = OmitImmerable<User>;
