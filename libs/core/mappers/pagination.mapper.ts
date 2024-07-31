import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

	/**
	 * Maps dto to model.
	 * @param pagination - Pagination dto.
	 * @param mapper - Mapper function for results field.
	 * @returns Pagination model.
	 */
	export function fromDto<I, O>(pagination: PaginationDto<I>, mapper: (dto: I) => O): Pagination<O> {

		return new Pagination<O>({
			count: pagination.count,
			next: pagination.next,
			previous: pagination.previous,
			results: pagination.results.map(item => mapper(item)),
		});
	}

}
