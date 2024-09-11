import { FC, memo, useState } from 'react';
import { Avatar, Box, Modal, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { selectAvatarUrl } from '@js-camp/react/store/avatar/selectors';
import { resetError } from '@js-camp/react/store/avatar/slice';

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
				<Typography
					sx={{ cursor: 'pointer' }}
					onClick={handleOpen}
				>
					Select image for avatar
				</Typography>
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
