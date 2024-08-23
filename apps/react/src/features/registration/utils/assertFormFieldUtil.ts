import { RegistrationData } from '@js-camp/core/models/registration-data';
import { ServerErrorAttribute } from '@js-camp/core/models/server-error-attribute';
import { checkIsEnumMember } from '@js-camp/core/utils/check-is-enum.util';

/**
 * Assert that value is name of the registration form field.
 * @param value - String.
 */
export function assertFormField(value: string): asserts value is keyof RegistrationData {
	if (!checkIsEnumMember(value, ServerErrorAttribute)) {
		throw new Error(`${value} is not a valid name of form field!`);
	}
	if (value === ServerErrorAttribute.Avatar || value === ServerErrorAttribute.NonField) {
		throw new Error(`${value} is not a valid name of form field!`);
	}
}
