import { BaseSortFieldsDto } from '../dtos/base-sort-fields.dto';
import { StudioFilterParamsDto } from '../dtos/studio-filter-params.dto';
import { BaseSortFields } from '../models/base-sort-fields';
import { SortDirection } from '../models/sort-direction';
import { StudioFilterParams } from '../models/studio-filter-params';

const MAP_ANIME_SORT_FIELDS_TO_DTO: Record<BaseSortFields, BaseSortFieldsDto> = {
	[BaseSortFields.Name]: BaseSortFieldsDto.Name,
	[BaseSortFields.ModifiedDate]: BaseSortFieldsDto.ModifiedDate,
};

export namespace StudioFilterParamsMapper {

	/**
	 * Map search param to dto.
	 * @param model Filter params.
	 */
	function mapSearchToDto(model: StudioFilterParams.Search): StudioFilterParamsDto.Search | null {
		if (model.search) {
			return {
				search: model.search,
			};
		}
		return null;
	}

	/**
	 * Map sort options param to dto.
	 * @param model Filter params.
	 */
	function mapOrderingOptionToDto(model: StudioFilterParams.Sort): StudioFilterParamsDto.Sort | null {
		if (model.sortDirection && model.sortField) {
			const fieldDto = MAP_ANIME_SORT_FIELDS_TO_DTO[model.sortField];
			return {
				ordering: model.sortDirection === SortDirection.Descending ? `-${fieldDto}` : fieldDto,
			};
		}

		return null;
	}

	/**
	 * Map pagination param to dto.
	 * @param model Filter params.
	 */
	function mapPaginationToDto(model: StudioFilterParams.Pagination): StudioFilterParamsDto.Pagination | null {
		if (model.nextCursor) {
			return {
				cursor: model.nextCursor,
			};
		}
		return null;
	}

	/**
	 * Map anime filter params model to dto.
	 * @param params - Model with anime filter params for UI.
	 * @returns Anime filter params dto.
	 */
	export function toDto(params: StudioFilterParams.Combined): StudioFilterParamsDto.Combined {
		return {
			...mapSearchToDto(params),
			...mapPaginationToDto(params),
			...mapOrderingOptionToDto(params),
		};
	}
}
