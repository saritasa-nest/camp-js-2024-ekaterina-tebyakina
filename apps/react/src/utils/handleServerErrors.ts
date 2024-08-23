import { ServerErrorDto } from '@js-camp/core/dtos/server-error.dto';
import { ServerErrorMapper } from '@js-camp/core/mappers/server-error.mapper';
import { ServerError } from '@js-camp/core/models/server-error';
import { isAxiosError } from 'axios';
import { FieldValues, UseFormSetError, Path } from 'react-hook-form';

/**
 * Utility function to check if a key exists in a form's fields.
 * @param key - The string representation of a field name to be checked.
 * @param formFields - The object representing all fields in the form.
 * @returns A boolean indicating whether the provided key exists in the form fields object.
 */
function isFormField<T extends FieldValues>(key: string, formFields: T): key is Path<T> {
	return key in formFields;
}

/**
 * Sets errors received from the server to the form.
 * @param fetchError - Error from server.
 * @param setError - Method for setting error on form.
 * @param assertFormField - Function to assert form field names.
 * @param formFields - Form fields names.
 */
export function handleServerErrors<T extends FieldValues>(
	fetchError: unknown,
	setError: UseFormSetError<T>,
	formFields: T,
) {
	if (isAxiosError(fetchError) && fetchError.response) {
		const errors: ServerError[] = fetchError.response.data.errors.map(
			(errorDto: ServerErrorDto) => ServerErrorMapper.fromDto(errorDto),
		);
		errors.forEach(error => {
			if (error.attribute && isFormField(error.attribute, formFields)) {
				setError(error.attribute, {
					type: 'serverError',
					message: error.detail,
				});
			} else {
				setError('root', {
					type: 'serverError',
					message: error.detail,
				});
			}
		});
		return;
	}
	console.error(fetchError);
	setError('root', {
		type: 'serverError',
		message: 'Failed to process the request',
	});
}
