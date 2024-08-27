import { memo, FC, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import { useAppDispatch } from '@js-camp/react/store';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { changeFilters } from '@js-camp/react/store/genre/slice';

import style from './GenresSelect.module.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const typesGenre = [
	'GENRES',
	'EXPLICIT_GENRES',
	'THEMES',
	'DEMOGRAPHICS',
];

/** Genres select.  */
const GenresSelectComponent: FC = () => {
	const dispatch = useAppDispatch();
	const [typesName, setTypesName] = useState<string[]>([]);

	const handleChange = (event: SelectChangeEvent<typeof typesName>): void => {
		const {
			target: { value },
		} = event;

		const select = { select: value };
		dispatch(changeFilters(select));

		setTypesName(
			typeof value === 'string' ? value.split(',') : value,
		);
	};
	return (
		<>
			<FormControl className={style.select}>
				<InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
				<Select
					labelId="demo-multiple-checkbox-label"
					id="demo-multiple-checkbox"
					multiple
					value={typesName}
					onChange={handleChange}
					input={<OutlinedInput label="Tag" />}
					renderValue={selected => selected.join(', ')}
					MenuProps={MenuProps}
				>
					{typesGenre.map(type => (
						<MenuItem key={type} value={type}>
							<Checkbox checked={typesName.includes(type)} />
							<ListItemText primary={type} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</>
	);
};

/** Memorized genres select. */
export const GenresSelect = memo(GenresSelectComponent);
