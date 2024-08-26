
import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';

import { RootRouter } from './routes/RootRouter';
import { store } from './store/store';
import { Header } from './components/Header/Header';
import { Progress } from './components/Progress/Progress';

import './theme/styles.css';

/** App component. */
export const App: FC = () => (
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<StyledEngineProvider injectFirst>
					<Header />
					<Suspense fallback={<Progress />}>
						<RootRouter />
					</Suspense>
				</StyledEngineProvider>
			</div>
		</BrowserRouter>
	</Provider>
);
