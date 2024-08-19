/** Query params with anime filter settings. */
export type AnimeQueryParams = {

	/** Term for search anime. */
	readonly searchTerm: string;

	/** Selected anime types. */
	readonly selectedTypes: string;

	/** Selected sort settings. */
	readonly sortingSettings: string;
};
