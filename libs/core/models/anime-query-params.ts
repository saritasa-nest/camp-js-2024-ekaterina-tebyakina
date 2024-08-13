/** Query params with anime filter settings. */
export type AnimeQueryParams = {

	/** Index of current page. */
	readonly pageIndex: number;

	/** Page size. */
	readonly pageSize: number;

	/** Term for search anime. */
	readonly searchTerm: string;

	/** Selected anime types. */
	readonly selectedTypes: string;

	/** Selected sort settings. */
	readonly sortingSettings: string;
};
