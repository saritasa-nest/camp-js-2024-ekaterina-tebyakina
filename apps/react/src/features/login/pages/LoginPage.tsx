import { FC, memo } from 'react';

import { LoginForm } from '../components/LoginForm/LoginForm';

/** Login page component. */
const LoginPageComponent: FC = () => (
	<>
		<LoginForm/>
	</>
);

/** Memoized login page component. */
export const LoginPage = memo(LoginPageComponent);
