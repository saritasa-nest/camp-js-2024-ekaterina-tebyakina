import { Injectable } from '@angular/core';
import { toTypeDto } from '@js-camp/core/mappers/anime-type.mapper';
import { AnimeType } from '@js-camp/core/models/anime-type';

/** Anime API Access Service. */
@Injectable({ providedIn: 'root' })
export class TypeParamService {

	/**
	 * AnimeType.
	 * @param typesArr - AnimeType.
	 * @returns AnimeType.
	 */
	public composeTypeString(typesArr: AnimeType[]): string {
		if (typesArr) {
			const typesDtoArr = typesArr.map(type => toTypeDto(type));
			return typesDtoArr.join(',');
		}
		return '';
	}

	/**
	 * AnimeType.
	 * @param typesString - AnimeType.
	 * @returns AnimeType.
	 */
	public composeTypeArray(typesString: string): AnimeType[] {
		return typesString.split(',') as AnimeType[];
	}

}
