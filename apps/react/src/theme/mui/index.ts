/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: 'rgb(63 81 181)',
			contrastText: 'rgb(255 255 255)',
			dark: 'rgb(234 88 12)',
			light: 'rgb(251 146 60)',
		},
		error: {
			main: 'rgb(255 0 0)',
		},
		background: {
			default: 'rgb(255 255 255)',
		},
		text: {
			primary: 'rgb(0 0 0)',
		},
		custom: {
			borderColor: grey[200],
			shadowColor: 'rgb(107 107  107 / 65%)',
			hoverColor: grey[200],
			fontColor: grey[100],
		},
	},
});

export default theme;
