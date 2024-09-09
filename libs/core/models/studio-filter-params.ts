import { BaseSortFields } from './base-sort-fields';
import { SortDirection } from './sort-direction';

/** Studio filter params. */
export namespace StudioFilterParams {

	/** Sort. */
	export type Sort = {

		/** Field. */
		sortField: BaseSortFields | null;

		/** Direction. */
		sortDirection: SortDirection | null;
	};

	/** Pagination. */
	export type Pagination = {

		/** Order. */
		readonly nextCursor: string | null;
	};

	/** Search. */
	export type Search = {

		/** Order. */
		readonly search: string | null;
	};

	/** Studio query params. */
	export type Combined = Sort & Pagination & Search;
}
