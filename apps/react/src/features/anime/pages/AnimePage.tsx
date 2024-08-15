/* eslint-disable arrow-body-style */
import { memo, FC } from 'react';

/** Anime page component. */
const AnimePageComponent: FC = () => {

	return (
		<>
			<h1>Anime</h1>
		</>
	);
};

/**
 * Memorized AnimePageComponent.
 */
export const AnimePage = memo(AnimePageComponent);
