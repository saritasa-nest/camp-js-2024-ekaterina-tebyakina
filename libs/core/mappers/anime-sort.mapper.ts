import { AnimeSortDto } from '../dtos/anime-sort.dto';
import { AnimeSort } from '../models/anime-sort';
import { ColumnsIndexes } from '../models/columns-indexes';

export namespace AnimeSortMapper {

	/**
	 * Map aired dto to model.
	 * @param dto - Aired dto.
	 * @returns Aired model.
	 */
	export function fromDto(dto: AnimeSortDto): AnimeSort {

		const sortState: AnimeSort = { active: '', direction: '' };

		if (dto === '') {
			return sortState;
		}

		if (dto[0] === '-') {
			sortState.active = dto.slice(1) as ColumnsIndexes;
			sortState.direction = 'desc';
			return sortState;
		}

		sortState.active = dto as ColumnsIndexes;
		sortState.direction = 'asc';

		return sortState;
	}

	/**
	 * Map aired dto to model.
	 * @param model - Aired dto.
	 * @returns Aired model.
	 */
	export function toDto(model: AnimeSort): AnimeSortDto {

		let orderString = '';

		if (model) {
			const sortField = model.active;

			switch (model.direction) {
				case 'asc':
					orderString = sortField;
					break;
				case 'desc':
					orderString = `-${sortField}`;
					break;
				default:
					orderString = '';
			}
		}

		return orderString;
	}

}
