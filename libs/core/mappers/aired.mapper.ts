import { AiredDto } from '../dtos/aired.dto';
import { Aired } from '../models/aired';

export namespace AiredMapper {

	/**
	 * Map aired dto to model.
	 * @param aired - Aired dto.
	 * @returns Aired model.
	 */
	export function fromDto(aired: AiredDto): Aired {
		return {
			start: aired.start ? new Date(aired.start) : null,
			end: aired.end ? new Date(aired.end) : null,
		};
	}
}
