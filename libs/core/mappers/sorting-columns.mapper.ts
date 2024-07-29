import { SortingColumnsDto } from '../dtos/sorting-columns.dto';
import { SortingColumns } from '../models/sorting-columns';

export namespace ColumnsMapper {

	const sortingColumnsDtoMap: Readonly<Record<SortingColumnsDto, SortingColumns>> = {
		[SortingColumnsDto.EnglishTitle]: SortingColumns.EnglishTitle,
		[SortingColumnsDto.AiredStart]: SortingColumns.AiredStart,
		[SortingColumnsDto.Status]: SortingColumns.Status,
	};

	/**
	 * SortingColumnsDto.
	 * @param column SortingColumnsDto.
	 * @returns SortingColumnsDto.
	 */
	export function fromSortingColumnsDto(column: SortingColumnsDto): SortingColumns {
		return sortingColumnsDtoMap[column];
	}

	const sortingColumnsMap: Readonly<Record<SortingColumns, SortingColumnsDto>> = {
		[SortingColumns.EnglishTitle]: SortingColumnsDto.EnglishTitle,
		[SortingColumns.AiredStart]: SortingColumnsDto.AiredStart,
		[SortingColumns.Status]: SortingColumnsDto.Status,
	};

	/**
	 * SortingColumnsDto.
	 * @param column SortingColumnsDto.
	 * @returns SortingColumnsDto.
	 */
	export function toSortingColumnsDto(column: SortingColumns): SortingColumnsDto {
		return sortingColumnsMap[column];
	}

}
