/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
// Augment the palette to include an ochre color
import { Palette, PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface CustomPalette extends Palette {
		custom?: PaletteColor & {
			borderColor?: string;
			shadowColor?: string;
			hoverColor?: string;
			fontColor?: string;
		};
	}

	interface PaletteOptions {
		custom?: PaletteOptions & {
			borderColor?: string;
			shadowColor?: string;
			hoverColor?: string;
			fontColor?: string;
		};
	}
}
