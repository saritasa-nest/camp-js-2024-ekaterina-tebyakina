import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';

import { RootRouter } from './routes/RootRouter';
import { Header } from './components/header/Header';
import { store } from './store';
import './theme/styles.css';
import theme from './theme/mui';

/** App component. */
export const App: FC = () => (
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={theme}>
						<Header />
						<Suspense fallback={<div>Brrr... here should be your loader component</div>}>
							<RootRouter />
						</Suspense>
					</ThemeProvider>
				</StyledEngineProvider>
			</div>
		</BrowserRouter>
	</Provider>
);
