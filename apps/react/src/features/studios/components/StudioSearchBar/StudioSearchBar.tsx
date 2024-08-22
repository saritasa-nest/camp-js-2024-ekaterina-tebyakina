import { FC, memo, useState } from 'react';
import Box from '@mui/material/Box';
import useQueryParams from '@js-camp/react/hooks/useQueryParam';
import { Button, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { StudioQueryParams } from '@js-camp/core/mappers/studio-query-params.mapper';

/**
 * Genres text field component.
 * @param props Props.
 */
const StudioSearchBarComponent: FC = () => {
	const { getQueryParamByKey, setQueryParams } = useQueryParams<StudioQueryParams>();
	const searchParam = getQueryParamByKey('search');

	const [value, setValue] = useState(searchParam);

	/** Submit the search value to the URL. */
	function handleSubmitSearchValue(): void {
		const searchValue = value.length > 0 ? value : null;
		setQueryParams({ search: searchValue });
	}

	/** Submit the search value to the URL. */
	function handleResetSearchValue(): void {
		setQueryParams({ search: null });
	}

	return (
		<Box component="form" display="flex" padding={2} gap={1}>
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
							edge="end"
							disabled={value.length === 0}
						>
							<CancelIcon />
						</IconButton>
					),
				}}
			/>
			<Button type="button" variant="contained" onClick={handleSubmitSearchValue}>
				<SearchIcon />
			</Button>
		</Box>
	);
};

/** Memoized GenresTextFieldComponent. */
export const StudioSearchBar = memo(StudioSearchBarComponent);
