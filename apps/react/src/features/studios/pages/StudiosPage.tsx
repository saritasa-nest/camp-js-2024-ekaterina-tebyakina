import { memo, FC } from 'react';

/** Studios page component. */
const StudiosPageComponent: FC = () => (
	<>
		<h1>Studios</h1>
	</>
);

/** Memorized studios page component. */
export const StudiosPage = memo(StudiosPageComponent);
