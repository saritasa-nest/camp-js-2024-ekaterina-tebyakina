import { StudioDto } from '../dtos/studio.dto';
import { Studio } from '../models/studio';

export namespace StudioMapper {

	/**
	 * Maps dto to model.
	 * @param studio Studio dto.
	 * @returns Studio model.
	 */
	export function fromDto(studio: StudioDto): Studio {
		return new Studio({
			id: studio.id,
			name: studio.name,
			image: studio.image,
		});
	}
}
