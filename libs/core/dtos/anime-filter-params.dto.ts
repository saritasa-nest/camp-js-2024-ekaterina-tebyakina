/** Params for request to the server. Contains data about anime list filters. */
export type AnimeFilterParamsDto = {

	/** Offset. */
	readonly limit?: number;

	/** Limit. */
	readonly offset?: number;

	/** Search. */
	readonly search?: string;

	/** Type. */
	readonly type__in?: string;

	/** Ordering. */
	readonly ordering?: string;
};
