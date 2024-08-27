export namespace QueryService {

	/** Method for filtering a queries to the server.
	 * @param queries Object with queries.
	 */
	export function filter(queries: any): string {
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
		return searchParams.toString();
	}

}
