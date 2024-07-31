/** Params DTO. Data for query params and params for request to the server. */
export type QueryParamsDto = {

	/** Offset. */
	[ParamsNamesDto.Limit]: number;

	/** Limit. */
	[ParamsNamesDto.Offset]: number;

	/** Search. */
	[ParamsNamesDto.Search]: string;

	/** Type. */
	[ParamsNamesDto.Type]: string;

	/** Ordering. */
	[ParamsNamesDto.Ordering]: string;
};
