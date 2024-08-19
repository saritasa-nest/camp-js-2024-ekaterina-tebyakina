
import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';

import { RootRouter } from './routes/RootRouter';
import { store } from './store';
import { Header } from './components/header';

import './theme/styles.css';

/** App component. */
export const App: FC = () => (
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<StyledEngineProvider injectFirst>
					<Suspense fallback={<div>Brrr... here should be your loader component</div>}>
						<Header />
						<RootRouter />
					</Suspense>
				</StyledEngineProvider>

			</div>
		</BrowserRouter>
	</Provider>
);
