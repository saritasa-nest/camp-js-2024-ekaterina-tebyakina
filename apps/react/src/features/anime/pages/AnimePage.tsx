import { memo, FC } from 'react';

/** Anime page component. */
const AnimePageComponent: FC = () => (
	<>
		<h1>Anime</h1>
	</>
);

/**
 * Memorized anime page component.
 */
export const AnimePage = memo(AnimePageComponent);