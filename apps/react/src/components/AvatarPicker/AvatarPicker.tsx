import { FC, memo, useState } from 'react';
import { Avatar, Box, Button, Modal, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { selectAvatarUrl } from '@js-camp/react/store/avatar/selectors';
import { deleteAvatar, resetError } from '@js-camp/react/store/avatar/slice';

import { ImageUploader } from '../ImageUploader/ImageUploader';

const AVATAR_SIZE = 64;

const AvatarPickerComponent: FC = () => {
	const dispatch = useAppDispatch();
	const avatarUrl = useAppSelector(selectAvatarUrl);
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = () => setIsOpen(true);
	const handleClose = () => {
		setIsOpen(false);
		dispatch(resetError());
	};
	const handleDeleteButtonClick = () => dispatch(deleteAvatar());

	return (
		<>
			<Stack
				direction='row'
				spacing={1}
				sx={{
					width: '100%',
					alignItems: 'center',
				}}
			>
				<Avatar
					alt="User's avatar"
					src={avatarUrl ?? ''}
					sx={{
						width: AVATAR_SIZE,
						height: AVATAR_SIZE,
						cursor: 'pointer',
					}}
					onClick={handleOpen}
				/>
				<Button
					variant="outlined"
					startIcon={<CloudUploadIcon />}
					onClick={handleOpen}
				>
					Select
				</Button>
				<Button
					variant="outlined"
					startIcon={<DeleteIcon />}
					onClick={handleDeleteButtonClick}
				>
					Delete
				</Button>
			</Stack>
			<Modal
				open={isOpen}
				onClose={handleClose}
			>
				<Box sx={{
					position: 'relative',
					top: '30%',
					left: '50%',
					width: 400,
					transform: 'translate(-50%, -50%)',
					bgcolor: 'background.paper',
					p: 4,
				}}>
					<ImageUploader onUpload={handleClose}/>
				</Box>
			</Modal>
		</>
	);
};

/** Component for selecting user avatar. */
export const AvatarPicker = memo(AvatarPickerComponent);
