/** Params DTO. */
export type QueryParamsDto = {

	/** Offset. */
	offset: number;

	/** Limit. */
	limit: number;

	/** Search. */
	search?: string;

	/** Type. */
	type__in?: string;

	/** Ordering. */
	ordering?: string;
};
