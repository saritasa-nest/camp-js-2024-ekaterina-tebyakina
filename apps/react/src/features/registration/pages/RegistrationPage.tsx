import { FC, memo } from 'react';

import { RegistrationForm } from '../components/registrationForm/RegistrationForm';

/** Registration page component. */
const RegistrationPageComponent: FC = () => (
	<>
		<RegistrationForm/>
	</>
);

/** Memoized registration page component. */
export const RegistrationPage = memo(RegistrationPageComponent);
