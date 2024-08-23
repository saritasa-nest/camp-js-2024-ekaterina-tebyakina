import { FC, memo, useState } from 'react';
import Box from '@mui/material/Box';
import useQueryParams from '@js-camp/react/hooks/useQueryParam';
import { Button, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { StudioQueryParams } from '@js-camp/core/mappers/studio-query-params.mapper';
import { useAppSelector } from '@js-camp/react/store';
import { selectAreStudiosLoading } from '@js-camp/react/store/studio/selectors';

/**
 * Genres text field component.
 * @param props Props.
 */
const StudioSearchBarComponent: FC = () => {
	const { getQueryParamByKey, setQueryParams } = useQueryParams<StudioQueryParams>();
	const searchParam = getQueryParamByKey('search');

	const [value, setValue] = useState(searchParam);

	const isLoading = useAppSelector(selectAreStudiosLoading);

	/** Submit the search value to the URL. */
	function handleSubmitSearchValue(): void {
		const searchValue = value.length > 0 ? value : null;
		setQueryParams({ search: searchValue });
	}

	/** Submit the search value to the URL. */
	function handleResetSearchValue(): void {
		setValue('');
		setQueryParams({ search: null });
	}

	return (
		<Box
			component='form'
			display='flex'
			gap={1}
		>
			<TextField
				sx={{
					flex: '1 1 0',
				}}
				label={'Search'}
				value={value}
				onChange={e => setValue(e.target.value)}
				InputProps={{
					endAdornment: (
						<IconButton
							sx={{ display: value.length > 0 ? 'initial' : 'none', aspectRatio: 1 }}
							onClick={handleResetSearchValue}
							edge='end'
							disabled={value.length === 0}
						>
							<CancelIcon />
						</IconButton>
					),
				}}
			/>
			<Button
				type='button'
				variant='contained'
				onClick={handleSubmitSearchValue}
				disabled={isLoading}
			>
				<SearchIcon />
			</Button>
		</Box>
	);
};

/** Memoized StudioSearchBarComponent. */
export const StudioSearchBar = memo(StudioSearchBarComponent);
