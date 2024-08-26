export namespace QueryService {

	/** Method for filtering a queries to the server.
	 * @param queries Object with queries.
	 */
	export function filter(queries: any): string {
		const searchParams = new URLSearchParams();
		if (queries.search != null && queries.search !== '') {
			searchParams.append('search', String(queries.search));
		}
		return searchParams.toString();
	}

}
