import { Immerable, OmitImmerable } from './immerable';

/** User. */
export class User extends Immerable {

	/** Email. */
	public readonly email: string;

	/** First name. */
	public readonly firstName: string;

	/** Last name. */
	public readonly lastName: string;

	/** Avatar. */
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
