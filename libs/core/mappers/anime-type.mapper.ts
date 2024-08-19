import { AnimeTypeDto } from '../dtos/anime-type.dto';
import { AnimeType } from '../models/anime-type';
import { checkIsEnumMember } from '../utils/check-is-enum.util';

export namespace AnimeTypeMapper {
	const ANIME_TYPE_MAP_FROM_DTO: Readonly<Record<AnimeTypeDto, AnimeType>> = {
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
		return ANIME_TYPE_MAP_FROM_DTO[type];
	}

	const ANIME_TYPE_MAP_TO_DTO: Readonly<Record<AnimeType, AnimeTypeDto>> = {
		[AnimeType.Movie]: AnimeTypeDto.Movie,
		[AnimeType.Music]: AnimeTypeDto.Music,
		[AnimeType.ONA]: AnimeTypeDto.ONA,
		[AnimeType.OVA]: AnimeTypeDto.OVA,
		[AnimeType.Promotional]: AnimeTypeDto.Promotional,
		[AnimeType.Special]: AnimeTypeDto.Special,
		[AnimeType.TV]: AnimeTypeDto.TV,
		[AnimeType.Unknown]: AnimeTypeDto.Unknown,
	};

	/**
	 * Map type dto.
	 * @param type  - Type dto.
	 * @returns Type model.
	 */
	export function toDto(type: AnimeType): AnimeTypeDto {
		return ANIME_TYPE_MAP_TO_DTO[type];
	}

	/**
	 * Array to string.
	 * @param typesArray  - Types array.
	 * @returns String with types.
	 */
	export function arrayToString(typesArray: AnimeType[]): string {
		return typesArray.join(',');
	}

	/**
	 * String to array.
	 * @param typesString - String with types.
	 * @returns Types array.
	 */
	export function stringToArray(typesString: string): AnimeType[] {
		const typesArray = typesString.split(',');
		assertIsAnimeTypeArray(typesArray);
		return typesArray;
	}

	/**
	 * Assert that value is typeof AnimeType[].
	 * @param array - Value for checking.
	 */
	function assertIsAnimeTypeArray(array: unknown[]): asserts array is AnimeType[] {
		array.forEach(item => {
			if (!checkIsEnumMember(item, AnimeType)) {
				throw new Error(`${item} is not a valid AnimeType!`);
			}
		});
	}

	/**
	 * Assert that value is typeof AnimeType.
	 * @param value - Value for checking.
	 */
	export function assertIsAnimeType(value: unknown): asserts value is AnimeType {
		if (!checkIsEnumMember(value, AnimeType)) {
			throw new Error(`${value} is not a valid AnimeType!`);
		}
	}
}
