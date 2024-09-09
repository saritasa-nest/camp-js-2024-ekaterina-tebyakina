import { PaginationDto, PaginationListCursorDto } from '../dtos/pagination.dto';
import { Pagination, PaginationListCursor } from '../models/pagination';

export namespace PaginationMapper {

	/**
	 * Maps dto to model.
	 * @param pagination - Pagination dto.
	 * @param mapper - Mapper function for results field.
	 * @returns Pagination model.
	 */
	export function fromDto<TDto, TModel>(
		pagination: PaginationDto<TDto>,
		mapper: (dto: TDto) => TModel,
	): Pagination<TModel> {
		return new Pagination<TModel>({
			count: pagination.count,
			next: pagination.next,
			previous: pagination.previous,
			results: pagination.results.map(item => mapper(item)),
		});
	}
}

export namespace PaginationListCursorMapper {

	/**
	 * Get the cursor value from next and previous.
	 * @param urlString Url string from pagination.
	 */
	function getCursorValue(urlString: string | null): string | null {
		if (urlString) {
			const url = new URL(urlString);
			const cursor = url.searchParams.get('cursor');
			return cursor;
		}
		return urlString;
	}

	/**
	 * Maps dto to model.
	 * @param pagination - Pagination list cursor dto.
	 * @param mapper - Mapper function for results field.
	 */
	export function fromDto<TDto, TModel>(
		pagination: PaginationListCursorDto<TDto>,
		mapper: (dto: TDto) => TModel,
	): PaginationListCursorDto<TModel> {
		return new PaginationListCursor<TModel>({
			next: getCursorValue(pagination.next),
			previous: getCursorValue(pagination.previous),
			results: pagination.results.map(item => mapper(item)),
		});
	}
}
