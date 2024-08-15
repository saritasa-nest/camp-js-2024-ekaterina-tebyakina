
import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { RootRouter } from './routes/RootRouter';
import { store } from './store';

import { Header } from './components/header/Header';
import './theme/styles.css';

const theme = createTheme({
	// components: {
	// 	MuiTypography: {
	// 		variants: [
	// 			{
	// 				props: { variant: 'h1' },
	// 				style: {

	// 				},
	// 			},
	// 		],
	// 	},
	// },
	// palette: {
	// 	text: {
	// 		primary: '#000',
	// 	},
	// },
});

/**
 * App component.
 */
export const App: FC = () => (
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<div>
					<Suspense fallback={<div>Brrr... here should be your loader component</div>}>
						<Header />
						<RootRouter />
					</Suspense>
				</div>
			</BrowserRouter>
		</ThemeProvider>
	</Provider>
);
