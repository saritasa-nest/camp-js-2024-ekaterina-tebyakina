export namespace QueryService {
	export function filter(queries: any): string {
		const searchParams = new URLSearchParams();
		if (queries.search != null && queries.search !== '') {
			searchParams.append('search', String(queries.search));
		}
		return searchParams.toString();
	}

}
