import { AnimeTypeDto } from '../dtos/anime-type.dto';
import { AnimeType } from '../models/anime-type';

export namespace AnimeTypeMapper {
	const animeTypeDtoMap: Readonly<Record<AnimeTypeDto, AnimeType>> = {
		[AnimeTypeDto.Movie]: AnimeType.Movie,
		[AnimeTypeDto.Music]: AnimeType.Music,
		[AnimeTypeDto.ONA]: AnimeType.ONA,
		[AnimeTypeDto.OVA]: AnimeType.OVA,
		[AnimeTypeDto.Promotional]: AnimeType.Promotional,
		[AnimeTypeDto.Special]: AnimeType.Special,
		[AnimeTypeDto.TV]: AnimeType.TV,
		[AnimeTypeDto.Unknown]: AnimeType.Unknown,
	};

	/**
	 * Map type dto.
	 * @param type  - Type dto.
	 * @returns Type model.
	 */
	export function fromDto(type: AnimeTypeDto): AnimeType {
		return animeTypeDtoMap[type];
	}
}
