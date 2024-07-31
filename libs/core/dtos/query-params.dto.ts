/** Params DTO. Data for query params and params for request to the server. */
export type QueryParamsDto = {

	/** Offset. */
	readonly limit?: number;

	/** Limit. */
	readonly offset?: number;

	/** Search. */
	readonly search?: string;

	/** Type. */
	type__in?: string;

	/** Ordering. */
	ordering?: string;
};
