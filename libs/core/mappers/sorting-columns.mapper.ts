import { SortingColumnsDto } from '../dtos/sorting-columns.dto';
import { SortingColumns } from '../models/sorting-columns';

/** Type of anime type enum's keys. */
export type ColumnsKey = keyof typeof SortingColumnsDto;

/**
 * Map type dto.
 * @param type  - Type dto.
 * @returns Type model.
 */
export function toSortingColumnsDto(type: SortingColumns): SortingColumnsDto {
	const keyId = Object.values(SortingColumns).indexOf(type);
	const enumKey = Object.keys(SortingColumns)[keyId] as ColumnsKey;
	return SortingColumnsDto[enumKey];
}
