import { FC, memo, useState } from 'react';
import { Avatar, Box, Modal } from '@mui/material';
import { useAppSelector } from '@js-camp/react/store/store';
import { selectAvatarUrl } from '@js-camp/react/store/avatar/selectors';

import { AvatarUploader } from '../AvatarUploader/AvatarUploader';

import styles from './UserAvatar.module.css';

const style = {
	position: 'absolute' as 'absolute',
	top: '30%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

/**  */
const UserAvatarComponent: FC = () => {
	const avatarUrl = useAppSelector(selectAvatarUrl);
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	return (
		<>
			<div className={styles.wrapper}>
				<Avatar
					alt="User's avatar"
					src={avatarUrl ?? ''}
					sx={{ width: 56, height: 56, cursor: 'pointer' }}
					onClick={handleOpen}
				/>
				<p>Select image for avatar</p>
			</div>
			<Modal
				open={isOpen}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<AvatarUploader handleClose={handleClose}/>
				</Box>
			</Modal>
		</>
	);
};

/** Memoized avatar. */
export const UserAvatar = memo(UserAvatarComponent);
