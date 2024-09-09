import { AnimeStudioDto } from '../dtos/anime-studio.dto';
import { AnimeStudio } from '../models/anime-studio';

import { DateTimeMapper } from './date-time.mapper';

/** Anime studio mapper. */
export namespace AnimeStudioMapper {

	/**
	 * Map DTO to model.
	 * @param dto Anime studio DTO.
	 */
	export function fromDto(dto: AnimeStudioDto): AnimeStudio {
		return new AnimeStudio({
			id: dto.id,
			createdDate: DateTimeMapper.fromDto(dto.created),
			modifiedDate: DateTimeMapper.fromDto(dto.modified),
			name: dto.name,
			image: dto.image,
		});
	}

	/**
	 * Map model to DTO.
	 * @param model Anime studio model.
	 */
	export function toDto(model: AnimeStudio): AnimeStudioDto {
		return {
			id: model.id,
			created: DateTimeMapper.toDto(model.createdDate),
			modified: DateTimeMapper.toDto(model.modifiedDate),
			name: model.name,
			image: model.image,
		};
	}
}
