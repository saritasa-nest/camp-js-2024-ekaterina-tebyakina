import { LoginData } from '@js-camp/core/models/login-data';
import { ServerErrorAttribute } from '@js-camp/core/models/server-error-attribute';

/**
 * Assert that value is name of the login form field.
 * @param value - String.
 */
export function assertFormField(value: string): asserts value is keyof LoginData {
	if (value !== ServerErrorAttribute.Password && value !== ServerErrorAttribute.Email) {
		throw new Error(`${value} is not a valid name of form field!`);
	}
}
