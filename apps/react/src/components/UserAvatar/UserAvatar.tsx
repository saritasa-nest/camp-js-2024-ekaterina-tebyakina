import { Dispatch, FC, memo, SetStateAction, useState } from 'react';
import { Avatar, Box, Modal } from '@mui/material';

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

type Props = {

	/** */
	readonly onSelectAvatar: Dispatch<SetStateAction<null | string>>;
};

/**  */
const UserAvatarComponent: FC<Props> = ({ onSelectAvatar }: Props) => {
	const [avatarUrl, setAvatarUrl] = useState<string>('');
	const [avatarFile, setAvatarFile] = useState<null | File>(null);
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	const setAvatar = (avatar: string, file: File | null) => {
		setAvatarUrl(avatar);
		setAvatarFile(file);
		onSelectAvatar(avatar);
		handleClose();
	};

	return (
		<>
			<div className={styles.wrapper}>
				<Avatar
					alt="User's avatar"
					src={avatarUrl}
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
					<AvatarUploader value={avatarFile} onChange={setAvatar}/>
				</Box>
			</Modal>
		</>
	);
};

/** Memoized avatar. */
export const UserAvatar = memo(UserAvatarComponent);
