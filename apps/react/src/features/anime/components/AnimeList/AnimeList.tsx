import { memo, FC, useEffect, forwardRef, ForwardedRef } from 'react';
import { LinkProps, NavLink, useSearchParams } from 'react-router-dom';
import { List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchList, fetchNewPage } from '@js-camp/react/store/anime/dispatchers';
import { AnimeSortMapper } from '@js-camp/react/api/mappers/animeSortMapper';
import { AnimeTypeMapper } from '@js-camp/core/mappers/anime-type.mapper';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import {
	selectAdditionalAnimeLoading,
	selectAllAnime,
	selectAnimeListError,
	selectAnimeListLoading,
	selectNextPageUrl,
} from '@js-camp/react/store/anime/selectors';
import { Progress } from '@js-camp/react/components/Progress/Progress';
import { useInfiniteScroll } from '@js-camp/react/features/hooks/useInfiniteScroll';
import { QueryParams } from '@js-camp/react/models/queryParams';

import { ANIME_PATH } from '../../routes';

import styles from './AnimeList.module.css';

/** Anime list component. */
const AnimeListComponent: FC = () => {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const animeList = useAppSelector(selectAllAnime);
	const isLoading = useAppSelector(selectAnimeListLoading);
	const isAdditionalLoading = useAppSelector(selectAdditionalAnimeLoading);
	const error = useAppSelector(selectAnimeListError);
	const nextPageUrl = useAppSelector(selectNextPageUrl);

	useEffect(() => {
		if (!isLoading && !isAdditionalLoading) {
			dispatch(fetchList({
				searchTerm: searchParams.get(QueryParams.SearchTerm) ?? '',
				selectedTypes: AnimeTypeMapper.stringToArray(searchParams.get(QueryParams.SelectedTypes) ?? ''),
				sortingSettings: AnimeSortMapper.fromString(searchParams.get(QueryParams.SortingSettings) ?? ''),
			}));
		}
	}, [searchParams]);

	const lastElementRef = useInfiniteScroll({
		isLoading: isLoading && isAdditionalLoading,
		nextPageUrl,
		fetchData() {
			if (nextPageUrl) {
				dispatch(fetchNewPage(nextPageUrl));
			}
		},
	});

	if (isLoading) {
		return <Progress />;
	}
	if (error) {
		return <div className={styles.message}>{error}</div>;
	}
	if (animeList.length === 0) {
		return <div className={styles.message}>No anime found</div>;
	}

	const LinkRef = forwardRef<HTMLLIElement, LinkProps>((props, ref: ForwardedRef<HTMLLIElement>) => (
		<li ref={ref}>
			<NavLink {...props} />
		</li>
	));

	return (
		<List className={styles.list}>
			{ animeList.map((anime, index) =>
				<ListItem
					key={anime.id}
					className={styles.item}
					component={LinkRef}
					to={`/${ANIME_PATH}/${anime.id}`}
					ref={animeList.length === index + 1 ? lastElementRef : null}
					secondaryAction={
						<IconButton edge="end" aria-label="delete">
							<DeleteIcon />
						</IconButton>
					}
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
							<span className={styles.propertyTitle}>
								Japanese title:
							</span>
							<span
								className={styles.propertyValue}
								title={anime.japaneseTitle}
							>
								{anime.japaneseTitle ? anime.japaneseTitle : '\u2014'}
							</span>
						</p>
						<p className={styles.property}>
							<span className={styles.propertyTitle}>
								English title:
							</span>
							<span
								className={styles.propertyValue}
								title={anime.englishTitle}
							>
								{anime.englishTitle ? anime.englishTitle : '\u2014'}
							</span>
						</p>
						<p className={styles.property}>
							<span className={styles.propertyTitle}>
								Type:
							</span>
							<span className={styles.propertyValue}>
								{anime.type}
							</span>
						</p>
						<p className={styles.property}>
							<span className={styles.propertyTitle}>
								Status:
							</span>
							<span className={styles.propertyValue}>
								{anime.status}
							</span>
						</p>
					</div>
				</ListItem>)
			}
			{ isAdditionalLoading ? <Progress /> : null}
		</List>
	);
};

/** Memoized anime list. */
export const AnimeList = memo(AnimeListComponent);
