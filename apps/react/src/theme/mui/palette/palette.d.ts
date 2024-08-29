/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import '@mui/material/styles';
declare module '@mui/material/styles' {
	interface CustomPalette {
		primary: {
			default: {
				main: string;
				contrast: string;
			};
			light: {
				main: string;
				contrast: string;
			};
			dark: {
				main: string;
				contrast: string;
			};
		};
		background: {
			main: string;
			contrast: string;
		};
		border: string;
		shadow: string;
		hover: string;
		font: string;
	}
	interface Palette {
		custom: CustomPalette;
	}

	interface PaletteOptions {
		custom: Partial<CustomPalette>;
	}
}
