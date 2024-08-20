import { StudioFilterParamsDto } from '../dtos/studio-filter-params.dto';
import { StudioFilterParams } from '../models/studio-filter-params';

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
		};
	}
}
