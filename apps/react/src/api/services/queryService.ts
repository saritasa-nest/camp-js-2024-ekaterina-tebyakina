import { GenreFilters } from '@js-camp/core/models/genre-filters';

export namespace QueryService {

	const parseCursor = (link: string | null): string => {
		if (link == null) {
			return '';
		}
		const parts = link.split('/');
		const lastPart = parts.at(-1);

		return lastPart ? lastPart.slice(1) : '';
	};

	/** Method for filtering a queries to the server.
	 * @param queries Object with queries.
	 */
	export function filter(queries: GenreFilters): string {
		const searchParams = new URLSearchParams();
		if (queries.search != null && queries.search !== '') {
			searchParams.append('search', String(queries.search));
		}
		if (queries.select != null && queries.select.length !== 0) {
			searchParams.append('type__in', String(queries.select));
		}
		if (queries.sort != null && queries.sort !== '') {
			searchParams.append('ordering', String(queries.sort));
		}
		if (queries.next != null) {
			return parseCursor(queries.next);
		}
		return searchParams.toString();
	}

}
