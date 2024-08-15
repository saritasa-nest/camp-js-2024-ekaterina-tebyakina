/* eslint-disable arrow-body-style */
import { memo, FC } from 'react';

/** Studios page component. */
const StudiosPageComponent: FC = () => {

	return (
		<>
			<h1>Studios</h1>
		</>
	);
};

/**
 * Memorized StudiosPageComponent.
 */
export const StudiosPage = memo(StudiosPageComponent);
