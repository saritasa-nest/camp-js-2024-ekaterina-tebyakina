import { FC, memo, useEffect, useId, useState } from 'react';
import { SxProps, Theme } from '@mui/system';
import Button from '@mui/material/Button';
import { FileData } from '@js-camp/core/models/file-data';
import { FileConfig } from '@js-camp/core/models/file-config';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { selectAvatarError, selectIsAvatarLoading } from '@js-camp/react/store/avatar/selectors';
import { fetchAvatarUrl } from '@js-camp/react/store/avatar/dispatchers';
import { Box, Stack, Typography } from '@mui/material';

import { Progress } from '../Progress/Progress';

const fileInputStyles: SxProps<Theme> = {
	opacity: 0,
	position: 'absolute',
	left: 0,
	top: 0,
	width: 0,
	height: 0,
};

type Props = {

	/** Functionality that should be executed after successful file upload. */
	readonly onUpload: () => void;
};

const ImageUploaderComponent: FC<Props> = ({ onUpload }: Props) => {
	const dispatch = useAppDispatch();
	const error = useAppSelector(selectAvatarError);
	const isLoading = useAppSelector(selectIsAvatarLoading);

	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [avatarFile, setAvatarFile] = useState<File | null>(null);

	useEffect(() =>
		() => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		}
	, [previewUrl]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setAvatarFile(file);
			setPreviewUrl(URL.createObjectURL(file));
		}
	};

	const handleUploadButtonClick = () => {
		if (avatarFile) {
			const avatarData: FileData = {
				config: FileConfig.UserAvatars,
				filename: avatarFile.name,
				contentType: avatarFile.type,
				contentLength: avatarFile.size,
			};

			dispatch(fetchAvatarUrl({ fileData: avatarData, file: avatarFile }))
				.unwrap()
				.then(() => onUpload());
		}
	};

	const fileInputId = useId();

	return (
		<Stack
			direction='column'
			spacing={1}
			sx={{
				alignItems: 'center',
			}}
		>
			<Box sx={fileInputStyles}>
				<input
					id={fileInputId}
					type="file"
					accept="image/*"
					onChange={handleFileChange}
				/>
			</Box>
			<label htmlFor={fileInputId}>
				<Button
					variant="text"
					component="span"
				>
						Choose file
				</Button>
			</label>
			{previewUrl && (
				<Box
					component="img"
					src={previewUrl}
					alt="Avatar Preview"
					sx={{
						width: '150px',
						height: '150px',
						objectFit: 'cover',
					}}
				/>
			)}
			{ isLoading ? <Progress/> : null}
			{ error ?
				<Typography
					component='p'
					sx={{
						textAlign: 'center',
						color: 'error.main',
					}}
				>
					{error}
				</Typography> :
				null}
			{avatarFile && (
				<Button
					type="button"
					variant="outlined"
					disabled={isLoading}
					onClick={handleUploadButtonClick}
				>
					Upload avatar
				</Button>
			)}
		</Stack>
	);
};

/** Component for image uploading. */
export const ImageUploader = memo(ImageUploaderComponent);
