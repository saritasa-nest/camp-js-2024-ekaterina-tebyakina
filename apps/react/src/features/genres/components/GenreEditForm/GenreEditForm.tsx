import { FC, memo } from 'react';

/** Genre edit form. */
const GenreEditFormComponent: FC = () => (
	<form>
		Edit form
	</form>
);

/**
 * Memorized genre edit form.
 */
export const GenreEditForm = memo(GenreEditFormComponent);
