import './DownloadBtn.scss';
import { If } from 'tsx-statements';
import FaIcon from '@components/FaIcon';
import { Tooltip, Whisper } from 'rsuite';
import useModal from '@tools/Hooks/useModal';
import { getUrlFromFile } from '@tools/Utils/File';
import ConfirmModal from '@components/ConfirmModal/ConfirmModal';

const DownloadBtn: FC<DownloadBtnProps> = props => {
	const { registerModal, toggleModalState } = useModal();
	const { name, file, url, editable, onClick, onDelete } = props;
	const fileName = name || file?.name;

	const clickHandler = async () => {
		if (onClick) onClick?.();
		else {
			if (file && file instanceof File) {
				const fileUrl = await getUrlFromFile(file);
				if (fileUrl) window.open(fileUrl);
			} else if (url) window.open(url);
		}
	};

	return (
		<>
			<Whisper disabled={!fileName} placement='top' speaker={<Tooltip>{fileName}</Tooltip>}>
				<div>
					<div onClick={clickHandler} className='download-btn'>
						<FaIcon fa='d-download' />
						<span>{fileName || 'Download File'}</span>
						<If condition={editable}>
							<FaIcon
								fa='s-trash-can'
								className='float-right trash'
								onClick={e => {
									e?.stopPropagation();
									toggleModalState();
								}}
							/>
						</If>
					</div>
				</div>
			</Whisper>
			<ConfirmModal
				{...registerModal}
				header='Delete file'
				onAccept={async () => {
					await onDelete?.();
					toggleModalState?.();
				}}
				onCancel={toggleModalState}>
				Are you sure you want to delete this file?
			</ConfirmModal>
		</>
	);
};

type DownloadBtnProps = {
	file?: File;
	url?: string;
	name?: string;
	editable?: boolean;
	onClick?: () => void;
	onDelete?: () => void;
};

export default DownloadBtn;
