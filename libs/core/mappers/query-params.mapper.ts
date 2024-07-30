import { QueryParamsDto } from '../dtos/query-params.dto';
import { QueryParams } from '../models/query-params';

export namespace QueryParamsMapper {

	// /**
	//  * Maps dto to model.
	//  * @param model Genre dto.
	//  */
	// export function toQueryParamsDto(model: QueryParams): QueryParamsDto {
	// 	return {
	// 		offset: model.offset,
	// 		limit: model.limit,
	// 		search: model.search,
	// 		type__in: model.type,
	// 		ordering: model.ordering,
	// 	};
	// }

	// /**
	//  * Maps dto to model.
	//  * @param dto Genre dto.
	//  */
	// export function fromQueryParamsDto(dto: QueryParamsDto): QueryParams {
	// 	return new QueryParams({
	// 		offset: dto.offset,
	// 		limit: dto.limit,
	// 		search: dto.search,
	// 		type: dto.type__in,
	// 		ordering: dto.ordering,
	// 	});
	// }
}
