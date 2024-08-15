import { FC, memo } from 'react';

/** Edit form. */
const GenreEditFormComponent: FC = () => (
	<form>
		Edit form
	</form>
);

/**
 * Memorized edit form.
 */
export const GenreEditForm = memo(GenreEditFormComponent);
