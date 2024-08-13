import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

	/**
	 * Maps dto to model.
	 * @param pagination - Pagination dto.
	 * @param mapper - Mapper function for results field.
	 * @returns Pagination model.
	 */
	export function fromDto<TDto, TModel>(pagination: PaginationDto<TDto>, mapper: (dto: TDto) => TModel): Pagination<TModel> {

		return new Pagination<TModel>({
			count: pagination.count,
			next: pagination.next,
			previous: pagination.previous,
			results: pagination.results.map(item => mapper(item)),
		});
	}

}
