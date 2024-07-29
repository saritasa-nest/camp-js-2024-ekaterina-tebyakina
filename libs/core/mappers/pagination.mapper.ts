import { PaginationDto } from '../dtos/pagination.dto';

// import { Anime } from "../models/anime";

import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

	/**
	 * Maps dto to model.
	 * @param pageIndex Pagination dto.
	 * @param pageSize Pagination dto.
	 * @param dto Pagination dto.
	 * @param mapper Pagination dto.
	 */
	export function fromDto<I, O>(dto: PaginationDto<I>, pageIndex: number, pageSize: number, mapper: (dto: I) => O): Pagination<O> {

		return new Pagination<O>({
			pagesCount: Math.ceil(dto.count / pageSize),
			pageSize,
			pageIndex,
			next: dto.next,
			previous: dto.previous,
			results: dto.results.map(item => mapper(item)),
		});
	}

}
