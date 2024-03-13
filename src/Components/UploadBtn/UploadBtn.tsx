import './UploadBtn.scss';
import Btn from '@components/BTN/BTN';
import { useEffect } from 'react';
import { If, Else } from 'tsx-statements';
import { Notify } from '@tools/Utils/React';
import useClass from '@tools/Hooks/useClass';
import useAccount from '@tools/Hooks/useAccount';
import PanelLoader from '@components/PanelLoader';
import DownloadBtn from '@components/DownloadBtn/DownloadBtn';
import useFileSelector from '../../Tools/Hooks/useUpload/index';
import useMountedState from '../../Tools/Hooks/useMountedState/useMountedState';

const UploadBtn: FC<UploadBtnProps> = props => {
	const { user } = useAccount();
	const { Class } = useClass(props?.table);
	const [fileItem, setFileItem] = useMountedState<any>();
	const { file, selectFile, clearFile } = useFileSelector();

	//? ---------------- Extracting Data -----------------------------------------------

	const { uploadBtnTitle } = props;
	const { editable = true, body = {}, table, onSave, onDelete, ID, only } = props;
	const PRIMARY_KEY = table + '_ID';

	//? --------------------- Utils ----------------------------------------------------

	const initLoad = async () => {
		if (!ID || fileItem?.[table + '_ID'] === ID) return;
		const { item } = await Class.getItem(ID);
		setFileItem(item);
	};

	const uploadFile = async () => {
		try {
			const reqBody: any = { ...body, file };
			reqBody.SYSTEM_USER = user?.SYSTEM_USER_ID;
			if (!reqBody?.name) reqBody.name = file?.name;
			const { item } = (await Class.addItem(reqBody)) || {};
			setFileItem(item);
			await onSave?.(item as any);
			clearFile?.();
			Notify.success('File Uploaded Successfully!');
		} catch (error: any) {
			Notify.error(error?.message);
		}
	};

	const removeFile = async () => {
		try {
			const { [PRIMARY_KEY]: CLASS_ID } = fileItem;
			if (!CLASS_ID) return;
			const { item } = await Class.deleteItem(CLASS_ID);
			Notify.success('File Deleted Successfully!');
			onDelete?.(item as any);
		} catch (error: any) {
			Notify.error(error.message);
		} finally {
			clearFile?.();
			setFileItem(undefined);
		}
	};

	//? ----------------- useEffects -----------------------------------------------

	useEffect(() => {
		if (!file?.name) return;
		uploadFile();
	}, [file]);

	useEffect(() => {
		initLoad();
	}, [ID]);

	//------------------------------------------------------------------------------

	return (
		<div className='upload-btn-container'>
			<PanelLoader loading={Class.loadings.getItem}>
				<If condition={!!fileItem && (!only || only !== 'upload')}>
					<DownloadBtn editable={editable} url={fileItem?.file} name={fileItem?.name} onDelete={removeFile} />
					<Else>
						<Btn fa='s-upload' className='upload-btn' onClick={selectFile} loading={Class.loadings.addItem}>
							{uploadBtnTitle || 'Upload File'}
						</Btn>
					</Else>
				</If>
			</PanelLoader>
		</div>
	);
};

type UploadBtnProps = {
	ID?: string;
	editable?: boolean;
	body: Partial<FileItem>;
	uploadBtnTitle?: string;
	only?: 'upload' | 'download';
	onSave?: (item: FileItem) => void;
	onDelete?: (item: FileItem) => void;
	table: SUG<Includes<CLASS_NAMES, 'FILE'>>;
};

export type FileItem = OBJECT & {
	tag?: string;
	file?: string;
	name?: string;
	related_class_id?: string;
};

export default UploadBtn;
