import { memo, FC, useCallback, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchList, fetchNewPage } from '@js-camp/react/store/anime/dispatchers';
import { AnimeSortMapper } from '@js-camp/react/api/mappers/animeSortMapper';
import { AnimeTypeMapper } from '@js-camp/core/mappers/anime-type.mapper';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { selectAllAnime, selectAnimeListLoading, selectNextPageUrl } from '@js-camp/react/store/anime/selectors';
import { Progress } from '@js-camp/react/components/Progress/Progress';

import { PATH_TO_ANIME } from '../../routes';

import styles from './AnimeList.module.css';

/** Anime list component.  */
const AnimeListComponent: FC = () => {
	const observer = useRef<IntersectionObserver | null>();
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

	const animeList = useAppSelector(selectAllAnime);
	const isLoading = useAppSelector(selectAnimeListLoading);
	const nextPageUrl = useAppSelector(selectNextPageUrl);

	useEffect(() => {
		const filterParams = {
			searchTerm: searchParams.get('searchTerm') ?? '',
			selectedTypes: AnimeTypeMapper.stringToArray(searchParams.get('selectedTypes') ?? ''),
			sortingSettings: AnimeSortMapper.fromString(searchParams.get('sortingSettings') ?? ''),
		};

		if (!isLoading) {
			dispatch(fetchList(filterParams));
		}
	}, [searchParams]);

	const lastPostElementRef = useCallback(
		(node: HTMLAnchorElement) => {
			if (isLoading) {
				return;
			}
			if (observer.current) {
				observer.current.disconnect();
			}

			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting) {

					if (!isLoading && nextPageUrl) {
						dispatch(fetchNewPage(nextPageUrl));
					}
				}
			});

			if (node) {
				observer.current.observe(node);
			}
		},
		[isLoading],
	);

	return (
		<List className={styles.list}>
			{ animeList.map((anime, index) =>
				<ListItem
					key={anime.id}
					className={styles.item}
					secondaryAction={
						<IconButton edge="end" aria-label="delete">
							<DeleteIcon />
						</IconButton>
					}
					component={Link}
					to={`/${PATH_TO_ANIME}/${anime.id}`}
					ref={animeList.length === index + 1 ? lastPostElementRef : null}
				>
					<div>
						<img
							className={styles.cover}
							src={anime.image}
							alt={`${anime.japaneseTitle || 'Anime'} cover` }
						/>
					</div>
					<div>
						<p className={styles.property}>
							<span className={styles['property-title']}>
								Japanese title:
							</span>
							<span
								className={styles['property-value']}
								title={anime.japaneseTitle}
							>
								{anime.japaneseTitle ? anime.japaneseTitle : '\u2014'}
							</span>
						</p>
						<p className={styles.property}>
							<span className={styles['property-title']}>
								English title:
							</span>
							<span
								className={styles['property-value']}
								title={anime.englishTitle}
							>
								{anime.englishTitle ? anime.englishTitle : '\u2014'}
							</span>
						</p>
						<p className={styles.property}>
							<span className={styles['property-title']}>
								Type:
							</span>
							<span className={styles['property-value']}>
								{anime.type}
							</span>
						</p>
						<p className={styles.property}>
							<span className={styles['property-title']}>
								Status:
							</span>
							<span className={styles['property-value']}>
								{anime.status}
							</span>
						</p>
					</div>
				</ListItem>) }
			{isLoading ? <Progress /> : null }
		</List>
	);
};

/** Memoized anime list. */
export const AnimeList = memo(AnimeListComponent);
