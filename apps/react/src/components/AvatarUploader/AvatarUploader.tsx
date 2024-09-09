import { FC, memo, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { FileData } from '@js-camp/core/models/file-data';
import { s3Service } from '@js-camp/react/api/services/s3Service';
import { FileConfig } from '@js-camp/core/models/file-config';

import { Progress } from '../Progress/Progress';

import styles from './AvatarUploader.module.css';

type Props = {

	/** */
	readonly value: File | null;

	/** */
	readonly onChange: (avatar: string, file: File | null) => void;
};

/** Header component. */
const AvatarUploaderComponent: FC<Props> = ({ onChange }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [avatarFile, setAvatarFile] = useState<File | null>(null);

	// Clean up the object URL when the component unmounts or when a new file is selected
	useEffect(() =>

		// Cleanup on unmount or when a new previewUrl is set
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
			// Revoke the previous URL to prevent memory leaks
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}

			setAvatarFile(file);
			const preview = URL.createObjectURL(file);
			setPreviewUrl(preview);

			// onChange(file); // Notify parent of the selected file
		}
	};

	const setUrl = async() => {
		if (avatarFile) {
			const imageData: FileData = {
				config: FileConfig.UserAvatars,
				filename: avatarFile?.name,
				contentType: avatarFile?.type,
				contentLength: avatarFile?.size,
			};

			// s3Service.getParams(imageData);
			setIsLoading(true);
			const url = await s3Service.saveFile(imageData, avatarFile);
			setIsLoading(false);
			onChange(url, avatarFile);

		}
	};

	// Provide download functionality for the selected image
	const handleDownload = () => {
		setUrl();
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
			{avatarFile && (
				<Button
					type="button"
					variant="outlined"
					onClick={handleDownload}
				>
						Upload avatar
				</Button>
			)}
		</div>
	);
};

/** Memoized avatar uploader. */
export const AvatarUploader = memo(AvatarUploaderComponent);
