/** Params for request to the server. Contains data about anime list filters. */
export type AnimeFilterParamsDto = {

	/** String for searching anime. */
	readonly search?: string;

	/** Selected anime types for filtering anime. */
	readonly type__in?: string;

	/** Sorting settings for sorting anime. */
	readonly ordering?: string;
};
