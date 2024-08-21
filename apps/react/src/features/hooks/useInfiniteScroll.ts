import { useCallback, useRef } from 'react';

type UseInfiniteScrollProps = {

	/** Loading status. */
	isLoading: boolean;

	/** The URL of the next page of data. */
	nextPageUrl: string | null;

	/** Function for fetching data. */
	fetchData: () => void;
};

/**
 * Hook for handle scroll and fetch data.
 * @param infiniteScrollProps - Object with params for fetch.
 */
export const useInfiniteScroll = ({ isLoading, nextPageUrl, fetchData }: UseInfiniteScrollProps) => {
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
				if (entries[0].isIntersecting) {
					if (!isLoading && nextPageUrl) {
						fetchData();
					}
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
