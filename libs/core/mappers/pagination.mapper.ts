import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

	/**
	 * Maps dto to model.
	 * @param pageIndex Pagination dto.
	 * @param pageSize Pagination dto.
	 * @param dto Pagination dto.
	 * @param mapper Pagination dto.
	 */
	export function fromDto<I, O>(dto: PaginationDto<I>, mapper: (dto: I) => O): Pagination<O> {

		return new Pagination<O>({
			count: dto.count,
			next: dto.next,
			previous: dto.previous,
			results: dto.results.map(item => mapper(item)),
		});
	}

}
