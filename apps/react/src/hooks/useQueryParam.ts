import { Path, useLocation, useNavigate } from 'react-router-dom';

/** Custom hook for handling manipulating query params. */
export default function useQueryParams<T>() {
	const { pathname, search } = useLocation();
	const navigate = useNavigate();
	const urlSearchParams = new URLSearchParams(search);
	const urlQueryObject = Object.fromEntries(urlSearchParams);

	const getQueryParamByKey = (key: string) => {
		const params = new URLSearchParams(search);
		return params.get(key) ?? '';
	};

	/**
	 * Update search params with the given T.
	 * @param params Params to pass to the url.
	 * @param targetPath Targeted path to direct.
	 * @param replace Replace the current path or not.
	 */
	function updateSearchParams(params: Partial<T>, targetPath: string = pathname, replace?: boolean): void {
		const newSearchParams = new URLSearchParams(search);

		Object.entries(params).forEach(([key, value]) => {
			if (value == null) {
				newSearchParams.delete(key);
			} else {
				newSearchParams.set(key, String(value));
			}
		});

		const query = newSearchParams.toString();

		const newUrl: Partial<Path> = {
			pathname: targetPath,
			search: query ?? '',
		};

		navigate(newUrl, { replace });
	}

	return {
		allQueryParams: urlQueryObject,
		getQueryParamByKey,
		setQueryParams: (params: Partial<T>) => updateSearchParams(params),
		navigateToPathWithQueryParams: (params: Partial<T>, pathName: string) =>
			updateSearchParams(params, pathName, false),
	};
}
