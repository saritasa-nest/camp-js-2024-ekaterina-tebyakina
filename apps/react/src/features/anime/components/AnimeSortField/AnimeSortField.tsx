import { memo, FC, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useSearchParams } from 'react-router-dom';
import { AnimeSort } from '@js-camp/react/models/animeSort';
import { AnimeSortMapper } from '@js-camp/react/api/mappers/animeSortMapper';

import styles from './AnimeSortField.module.css';

/** Anime filter form. */
const AnimeSortFieldComponent: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [sortingSettings, setSortingSetting] = useState(
		AnimeSortMapper.fromString(searchParams.get('sortingSettings') ?? ''),
	);

	/**
	 * Triggers when the sorting settings are changed.
	 * @param event - Click event.
	 * @param newSortingSettings - Anime sorting settings.
	 */
	const handleSortChange = (
		event: React.MouseEvent<HTMLElement>,
		newSortingSettings: AnimeSort | null,
	) => {
		setSortingSetting(newSortingSettings ? newSortingSettings : AnimeSort.None);
		searchParams.set('sortingSettings', newSortingSettings ? newSortingSettings : AnimeSort.None);
		setSearchParams(searchParams);
	};

	return (
		<ToggleButtonGroup
			size="small"
			value={sortingSettings}
			onChange={handleSortChange}
			exclusive={true}
		>
			<ToggleButton
				value={AnimeSort.AscendingEnglishTitle}
				key={AnimeSort.AscendingEnglishTitle}
				className={styles['sort-button']}
			>
						English title
				<ArrowUpwardIcon />
			</ToggleButton>,
			<ToggleButton
				value={AnimeSort.DescendingEnglishTitle}
				key={AnimeSort.DescendingEnglishTitle}
				className={styles['sort-button']}
			>
						English title
				<ArrowDownwardIcon />
			</ToggleButton>
			<ToggleButton
				value={AnimeSort.AscendingStatus}
				key={AnimeSort.AscendingStatus}
				className={styles['sort-button']}
			>
						Status
				<ArrowUpwardIcon />
			</ToggleButton>,
			<ToggleButton
				value={AnimeSort.DescendingStatus}
				key={AnimeSort.DescendingStatus}
				className={styles['sort-button']}
			>
						Status
				<ArrowDownwardIcon />
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

/** Memoized filter form. */
export const AnimeSortField = memo(AnimeSortFieldComponent);