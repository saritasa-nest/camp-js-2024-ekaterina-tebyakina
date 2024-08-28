import { Immerable, OmitImmerable } from './immerable';

/** User data for login. */
export class LoginData extends Immerable {

	/** Email that the user registered with. */
	public readonly email: string;

	/** Password that the user registered with. */
	public readonly password: string;

	public constructor(data: LoginConstructorData) {
		super();
		this.email = data.email;
		this.password = data.password;
	}
}

type LoginConstructorData = OmitImmerable<LoginData>;
