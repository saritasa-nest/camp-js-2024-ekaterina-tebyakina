import { Injectable } from '@angular/core';
import { AnimeTypeDto } from '@js-camp/core/dtos/anime-type.dto';
import { AnimeTypeMapper } from '@js-camp/core/mappers/anime-type.mapper';
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
			const typesDtoArr = typesArr.map(type => AnimeTypeMapper.toDto(type));
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
		const typesArr = typesString.split(',') ?? [];
		return typesArr.map(type => AnimeTypeMapper.fromDto(type as AnimeTypeDto));
	}

}
