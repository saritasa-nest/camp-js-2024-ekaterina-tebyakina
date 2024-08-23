import { ServerErrorDto } from '@js-camp/core/dtos/server-error.dto';
import { ServerErrorMapper } from '@js-camp/core/mappers/server-error.mapper';
import { ServerError } from '@js-camp/core/models/server-error';
import { LoginData } from '@js-camp/core/models/login-data';
import { isAxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

import { assertFormField } from './assertFormFieldUtil';

/**
 * Sets errors received from the server to the form.
 * @param fetchError - Error from server.
 * @param setError - Method for setting error on form.
 */
export function handleServerErrors(
	fetchError: unknown,
	setError: UseFormSetError<LoginData>,
) {
	if (isAxiosError(fetchError) && fetchError.response) {
		const loginErrors: ServerError[] = fetchError.response.data.errors.map(
			(errorDto: ServerErrorDto) => ServerErrorMapper.fromDto(errorDto),
		);
		loginErrors.forEach(error => {
			if (error.attribute) {
				assertFormField(error.attribute);
				setError(error.attribute, {
					type: 'serverError',
					message: error.detail,
				});
				return;
			}
			setError('root', {
				type: 'serverError',
				message: error.detail,
			});
		});
		return;
	}
	console.error(fetchError);
	setError(
		'root',
		{
			type: 'serverError',
			message: 'Failed to register',
		},
	);
}
