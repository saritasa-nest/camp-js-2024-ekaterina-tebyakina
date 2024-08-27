import { memo, FC, useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import style from './GenreSelect.module.css';

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

const names = [
	'Oliver Hansen',
	'Van Henry',
	'April Tucker',
	'Ralph Hubbard',
	'Omar Alexander',
	'Carlos Abbott',
	'Miriam Wagner',
	'Bradley Wilkerson',
	'Virginia Andrews',
	'Kelly Snyder',
];

/** Genres select.  */
const GenreSelectComponent: FC = () => {
	const [personName, setPersonName] = useState<string[]>([]);

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value },
		} = event;
		setPersonName(
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
					value={personName}
					onChange={handleChange}
					input={<OutlinedInput label="Tag" />}
					renderValue={selected => selected.join(', ')}
					MenuProps={MenuProps}
				>
					{names.map(name => (
						<MenuItem key={name} value={name}>
							<Checkbox checked={personName.indexOf(name) > -1} />
							<ListItemText primary={name} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</>
	);
};

/** Memorized genres select. */
export const GenreSelect = memo(GenreSelectComponent);
