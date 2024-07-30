import { Injectable } from '@angular/core';
import { AnimeTypeDto } from '@js-camp/core/dtos/anime-type.dto';
import { AnimeTypeMapper } from '@js-camp/core/mappers/anime-type.mapper';
import { AnimeType } from '@js-camp/core/models/anime-type';

/** Anime type query param service. */
@Injectable({ providedIn: 'root' })
export class TypeParamService {

	/**
	 * Compose value for query param from types array.
	 * @param typesArr - Array of selected types.
	 * @returns Value for query param.
	 */
	public composeTypeString(typesArr: AnimeType[]): string {
		if (typesArr) {
			const typesDtoArr = typesArr.map(type => AnimeTypeMapper.toDto(type));
			return typesDtoArr.join(',');
		}
		return '';
	}

	/**
	 * Compose types array from query param value.
	 * @param typesString - Query param value.
	 * @returns Array of anime types.
	 */
	public composeTypeArray(typesString: string): AnimeType[] {
		const typesArr = typesString.split(',');
		return typesArr.map(type => AnimeTypeMapper.fromDto(type as AnimeTypeDto));
	}

}
