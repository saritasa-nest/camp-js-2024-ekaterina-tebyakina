import { FC, memo } from 'react';

import { RegistrationForm } from '../components/RegistrationForm/RegistrationForm';

/** Registration page component. */
const RegistrationPageComponent: FC = () => (
	<>
		<RegistrationForm/>
	</>
);

/** Memoized registration page component. */
export const RegistrationPage = memo(RegistrationPageComponent);
