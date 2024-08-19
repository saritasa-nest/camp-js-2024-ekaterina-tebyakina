import { memo, FC, useCallback, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Anime } from '@js-camp/core/models/anime';
import { List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { PATH_TO_ANIME } from '../../routes';

import styles from './AnimeList.module.css';

type Props = {

	/** Anime. */
	readonly animeList: Anime[];
};

/** Anime list.  */
const AnimeListComponent: FC<Props> = ({ animeList }: Props) => {
	// const [searchParams, setSearchParams] = useSearchParams();

	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const observer = useRef<IntersectionObserver | null>();

	const lastPostElementRef = useCallback(
		(node: HTMLAnchorElement) => {
			if (loading) {
				return;
			}
			if (observer.current) {
				observer.current.disconnect();
			}

			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting) {
					console.log('page');
					setPage(prevPage => prevPage + 1); // trigger loading of new posts by chaging page no
				}
			});

			if (node) {
				observer.current.observe(node);
			}
		},
		[loading],
	);

	return (
		<List className={styles.list}>
			{ animeList.map((anime, index) =>
				<ListItem
					key={anime.id}
					className={styles.list__item}
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
							className={styles['list__item-cover']}
							src={anime.image}
							alt={`${anime.japaneseTitle || 'Anime'} cover` }
						/>
					</div>
					<div>
						<p className={styles['list__item-property']}>
							<span className={styles['item-property__title']}>
								Japanese title:
							</span>
							<span
								className={styles['item-property__value']}
								title={anime.japaneseTitle}
							>
								{anime.japaneseTitle ? anime.japaneseTitle : '\u2014'}
							</span>
						</p>
						<p className={styles['list__item-property']}>
							<span className={styles['item-property__title']}>
								English title:
							</span>
							<span
								className={styles['item-property__value']}
								title={anime.englishTitle}
							>
								{anime.englishTitle ? anime.englishTitle : '\u2014'}
							</span>
						</p>
						<p className={styles['list__item-property']}>
							<span className={styles['item-property__title']}>
								Type:
							</span>
							<span className={styles['item-property__value']}>
								{anime.type}
							</span>
						</p>
						<p className={styles['list__item-property']}>
							<span className={styles['item-property__title']}>
								Status:
							</span>
							<span className={styles['item-property__value']}>
								{anime.status}
							</span>
						</p>
					</div>
				</ListItem>) }
		</List>
	);
};

/** Memorized anime list. */
export const AnimeList = memo(AnimeListComponent);
