import { FC, memo, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { FileData } from '@js-camp/core/models/file-data';
import { FileConfig } from '@js-camp/core/models/file-config';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { selectAvatarError, selectIsAvatarLoading } from '@js-camp/react/store/avatar/selectors';
import { fetchAvatarUrl } from '@js-camp/react/store/avatar/dispatchers';

import { Progress } from '../Progress/Progress';

import styles from './AvatarUploader.module.css';

type Props = {

	/** */
	readonly handleClose: () => void;
};

/** Header component. */
const AvatarUploaderComponent: FC<Props> = ({ handleClose }: Props) => {
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

	// Handle file selection and pass the file to the parent component
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setAvatarFile(file);
			setPreviewUrl(URL.createObjectURL(file));
		}
	};

	// Provide download functionality for the selected image
	const handleUploadButtonClick = () => {
		if (avatarFile) {
			const imageData: FileData = {
				config: FileConfig.UserAvatars,
				filename: avatarFile?.name,
				contentType: avatarFile?.type,
				contentLength: avatarFile?.size,
			};

			dispatch(fetchAvatarUrl({ fileData: imageData, file: avatarFile }))
				.then(() => handleClose());
		}
	};

	return (
		<div className={styles.wrapper}>
			<div>
				<input
					id="file-input"
					type="file"
					accept="image/*"
					className={styles.fileInput}
					onChange={handleFileChange} />
				<label htmlFor="file-input">
					<Button
						variant="text"
						component="span"
					>
						Choose file
					</Button>
				</label>
			</div>
			{previewUrl && (
				<div>
					<img
						src={previewUrl}
						alt="Avatar Preview"
						style={{ width: '150px', height: '150px', objectFit: 'cover' }}
					/>
				</div>
			)}
			{ isLoading ? <Progress/> : null}
			{ error ? <p className={styles.errorMessage}>{error}</p> : null}
			{avatarFile && (
				<Button
					type="button"
					variant="outlined"
					onClick={handleUploadButtonClick}
				>
						Upload avatar
				</Button>
			)}
		</div>
	);
};

/** Memoized avatar uploader. */
export const AvatarUploader = memo(AvatarUploaderComponent);
