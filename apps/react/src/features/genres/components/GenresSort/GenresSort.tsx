import { memo, FC, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { changeFilters } from '@js-camp/react/store/genre/slice';
import { useAppDispatch } from '@js-camp/react/store';

/** Genres sort.  */
const GenresSortComponent: FC = () => {

	const [sortName, setSortName] = useState<string | number>('');
	const [open, setOpen] = useState(false);
	const dispatch = useAppDispatch();

	const handleChange = (event: SelectChangeEvent<typeof sortName>) => {
		const {
			target: { value },
		} = event;

		const sort = { sort: value };
		dispatch(changeFilters(sort));
		setSortName(value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<>
			<FormControl>
				<InputLabel id="demo-controlled-open-select-label">Sort</InputLabel>
				<Select
					labelId="demo-controlled-open-select-label"
					id="demo-controlled-open-select"
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
					value={sortName}
					label="Sort"
					onChange={handleChange}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value={'name'}>Name (A - Z)</MenuItem>
					<MenuItem value={'-name'}>Name (Z - A)</MenuItem>
					<MenuItem value={'type'}>Type (A - Z)</MenuItem>
					<MenuItem value={'-type'}>Type (Z - A)</MenuItem>
				</Select>
			</FormControl>
		</>
	);
};

/** Memorized genres sort. */
export const GenresSort = memo(GenresSortComponent);
