import { ParamsNamesDto } from './params-names.dto';

/** Params DTO. */
export type QueryParamsDto = {

	/** Offset. */
	[ParamsNamesDto.Limit]?: number;

	/** Limit. */
	[ParamsNamesDto.Offset]?: number;

	/** Search. */
	[ParamsNamesDto.Search]?: string;

	/** Type. */
	[ParamsNamesDto.Type]?: string;

	/** Ordering. */
	[ParamsNamesDto.Ordering]?: string;
};
