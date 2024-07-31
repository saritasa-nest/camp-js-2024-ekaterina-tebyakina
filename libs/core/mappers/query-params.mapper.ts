import { AnimeTypeDto } from '../dtos/anime-type.dto';
import { ParamsNamesDto } from '../dtos/params-names.dto';
import { QueryParamsDto } from '../dtos/query-params.dto';
import { QueryParams } from '../models/query-params';

import { AnimeSortMapper } from './anime-sort.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';

export namespace QueryParamsMapper {

	/**
	 * Map aired dto to model.
	 * @param dto - Aired dto.
	 * @returns Aired model.
	 */
	export function fromDto(dto: QueryParamsDto): QueryParams {
		const queryParams: QueryParams = {
			offset: 0,
			limit: 25,
			search: '',
			type: [],
			ordering: { active: '', direction: '' },
		};
		if (dto[ParamsNamesDto.Offset]) {
			queryParams.offset = dto[ParamsNamesDto.Offset];
		}
		if (dto[ParamsNamesDto.Limit]) {
			queryParams.limit = dto[ParamsNamesDto.Limit];
		}
		if (dto[ParamsNamesDto.Search]) {
			queryParams.search = dto[ParamsNamesDto.Search];
		}
		if (dto[ParamsNamesDto.Type]) {
			queryParams.type = dto[ParamsNamesDto.Type].split(',').map(type => AnimeTypeMapper.fromDto(type as AnimeTypeDto));
		}
		if (dto[ParamsNamesDto.Ordering]) {
			queryParams.ordering = AnimeSortMapper.fromDto(dto[ParamsNamesDto.Ordering]);
		}
		return queryParams;
	}

	/**
	 * Map aired dto to model.
	 * @param model - Aired dto.
	 * @returns Aired model.
	 */
	export function toDto(model: QueryParams): QueryParamsDto {
		const queryParams: QueryParamsDto = {
			[ParamsNamesDto.Offset]: 0,
			[ParamsNamesDto.Limit]: 25,
			[ParamsNamesDto.Search]: '',
			[ParamsNamesDto.Type]: '',
			[ParamsNamesDto.Ordering]: '',
		};
		queryParams[ParamsNamesDto.Offset] = model.offset;
		queryParams[ParamsNamesDto.Limit] = model.limit;
		queryParams[ParamsNamesDto.Search] = model.search;
		queryParams[ParamsNamesDto.Type] = model.type.map(type => AnimeTypeMapper.toDto(type)).join(',');
		queryParams[ParamsNamesDto.Ordering] = AnimeSortMapper.toDto(model.ordering);

		return queryParams;
	}
}
