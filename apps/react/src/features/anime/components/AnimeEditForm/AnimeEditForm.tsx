import { FC, memo } from 'react';

/** Anime edit form. */
const AnimeEditFormComponent: FC = () => (
	<form>
		Edit form
	</form>
);

/** Memorized anime edit form. */
export const AnimeEditForm = memo(AnimeEditFormComponent);
