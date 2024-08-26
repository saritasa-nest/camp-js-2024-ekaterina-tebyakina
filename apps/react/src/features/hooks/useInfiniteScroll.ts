import { useCallback, useRef } from 'react';

type UseInfiniteScrollParams = {

	/** Loading status. */
	readonly isLoading: boolean;

	/** The URL of the next page of data. */
	readonly nextPageUrl: string | null;

	/** Function for fetching data. */
	readonly fetchData: () => void;
};

/**
 * Hook for handle scroll and fetch data.
 * @param UseInfiniteScrollParams - Object with params for fetch.
 */
export const useInfiniteScroll = ({ isLoading, nextPageUrl, fetchData }: UseInfiniteScrollParams) => {
	const observer = useRef<IntersectionObserver | null>();

	const lastElementRef = useCallback(
		(node: HTMLLIElement | null) => {
			if (isLoading) {
				return;
			}
			if (observer.current) {
				observer.current.disconnect();
			}
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && !isLoading && nextPageUrl) {
					fetchData();
				}
			});
			if (node) {
				observer.current.observe(node);
			}
		},
		[isLoading, nextPageUrl],
	);

	return lastElementRef;
};
