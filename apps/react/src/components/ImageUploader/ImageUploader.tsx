import { FC, memo, useEffect, useId, useState } from 'react';
import Button from '@mui/material/Button';
import { FileData } from '@js-camp/core/models/file-data';
import { FileConfig } from '@js-camp/core/models/file-config';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { selectAvatarError, selectIsAvatarLoading } from '@js-camp/react/store/avatar/selectors';
import { fetchAvatarUrl } from '@js-camp/react/store/avatar/dispatchers';

import { Box, Stack, Typography } from '@mui/material';

import { Progress } from '../Progress/Progress';

import styles from './ImageUploader.module.css';

type Props = {

	/** Close dialog. */
	readonly handleClose: () => void;
};

const ImageUploaderComponent: FC<Props> = ({ handleClose }: Props) => {
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
			const imageData: FileData = {
				config: FileConfig.UserAvatars,
				filename: avatarFile.name,
				contentType: avatarFile.type,
				contentLength: avatarFile.size,
			};

			dispatch(fetchAvatarUrl({ fileData: imageData, file: avatarFile }))
				.unwrap()
				.then(() => handleClose());
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
			<div>
				<input
					id={fileInputId}
					type="file"
					accept="image/*"
					className={styles.fileInput}
					onChange={handleFileChange}
				/>
				<label htmlFor={fileInputId}>
					<Button
						variant="text"
						component="span"
					>
						Choose file
					</Button>
				</label>
			</div>
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
					}}>
					{error}
				</Typography> :
				null}
			{avatarFile && (
				<Button
					type="button"
					variant="outlined"
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
