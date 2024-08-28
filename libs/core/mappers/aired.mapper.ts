import { AiredDto } from '../dtos/aired.dto';
import { Aired } from '../models/aired';

export namespace AiredMapper {

	/**
	 * Map aired dto to model. Converts strings to dates.
	 * @param aired - Aired dto.
	 * @returns Aired model.
	 */
	export function fromDto(aired: AiredDto): Aired {
		return {
			start: aired.start ? new Date(aired.start) : null,
			end: aired.end ? new Date(aired.end) : null,
		};
	}

	/**
	 * Map aired model to dto. Converts strings to dates.
	 * @param aired - Aired model.
	 * @returns Aired dto.
	 */
	export function toDto(aired: Aired): AiredDto {
		return {
			start: aired.start ? aired.start.toISOString() : null,
			end: aired.end ? aired.end.toISOString() : null,
		};
	}
}
