import { ServerErrorAttributeDto } from '../dtos/server-error-attribute.dto';
import { ServerErrorDto } from '../dtos/server-error.dto';
import { ServerError } from '../models/server-error';
import { checkIsEnumMember } from '../utils/check-is-enum.util';

import { ServerErrorAttributeMapper } from './server-error-attribute.mapper';

/** Map server error model and dto. */
export namespace ServerErrorMapper {

	/**
	 * Maps dto to model.
	 * @param error - Error dto.
	 * @returns Error model.
	 */
	export function fromDto(error: ServerErrorDto): ServerError {
		const attribute = checkIsEnumMember(error.attr, ServerErrorAttributeDto) ? ServerErrorAttributeMapper.fromDto(error.attr) : null;
		return new ServerError({
			attribute,
			detail: error.detail,
		});
	}
}
