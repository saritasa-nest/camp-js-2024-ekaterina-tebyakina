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

	const handleSelectGenre = (event: SelectChangeEvent<typeof typesName>): void => {
		const {
			target: { value },
		} = event;

		const select = { select: value, next: null };
		dispatch(changeFilters(select));

		setTypesName(
			typeof value === 'string' ? value.split(',') : value,
		);
	};
	return (
		<>
			<FormControl>
				<InputLabel id="demo-multiple-checkbox-label">Select types genres</InputLabel>
				<Select
					labelId="demo-multiple-checkbox-label"
					id="demo-multiple-checkbox"
					multiple
					value={typesName}
					onChange={handleSelectGenre}
					input={<OutlinedInput label="Select types genres" />}
					renderValue={selected => selected.join(', ')}
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
