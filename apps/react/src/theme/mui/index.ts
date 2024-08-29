import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		custom: {
			primary: {
				default: {
					main: 'rgb(63 81 181)',
					contrast: 'rgb(255 255 255)',
				},
				light: {
					main: 'rgb(251 146 60)',
					contrast: 'rgb(0 0 0)',
				},
				dark: {
					main: 'rgb(234 88 12)',
					contrast: 'rgb(255 255 255)',
				},
			},
			background: {
				main: 'rgb(255 255 255)',
				contrast: 'rgb(0 0 0)',
			},
			border: 'rgb(0 0 0 / 15%)',
			font: 'rgb(0 0 0)',
			hover: 'rgb(0 0 0 / 15%)',
			shadow: 'rgb(107 107  107 / 65%)',
		},
	},
});

export default theme;
