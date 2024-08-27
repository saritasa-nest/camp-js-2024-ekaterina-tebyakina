import { SortDirection } from '../models/sort-direction';

import { StudioFilterParams } from '../models/studio-filter-params';
import { BaseSortFields } from '../models/base-sort-fields';

import { StudioQueryParams } from './studio-query-params.mapper';

export namespace SortParamsMapper {

	/**
	 * Map query params to filter params.
	 * @param dto Query params.
	 */
	export function mapToSortFilterParams(dto: StudioQueryParams['sort']): StudioFilterParams.Sort {
		if (dto) {
			const [field, direction] = dto.split('-');

			let sortDirection: SortDirection | null;

			switch (direction) {
				case SortDirection.Ascending:
					sortDirection = SortDirection.Ascending;
					break;
				case SortDirection.Descending:
					sortDirection = SortDirection.Descending;
					break;
				default:
					sortDirection = null;
					break;
			}
			return {
				sortField: Object.values(BaseSortFields).includes(field as BaseSortFields) ?
					BaseSortFields[field as BaseSortFields] :
					null,
				sortDirection: sortDirection ?? null,
			};
		}
		return {
			sortDirection: null,
			sortField: null,
		};
	}

	/**
	 * Map filter params to query params.
	 * @param model Filter params.
	 */
	export function mapToSortQueryParams(model: StudioFilterParams.Sort): StudioQueryParams['sort'] {
		const { sortDirection, sortField } = model;
		if (sortDirection && sortField) {
			return `${sortField}-${sortDirection}`;
		}
		return '';
	}
}
