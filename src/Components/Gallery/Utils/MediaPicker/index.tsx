import './index.scss';
import useInputs from 'use-inputs';
import Btn from '../../../BTN/BTN';
import { If } from 'tsx-statements';
import FaIcon from '../../../FaIcon';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import PanelLoader from '../../../PanelLoader';
import { Col, Row, Uploader, Modal } from 'rsuite';
import { FileType } from 'rsuite/esm/Uploader/Uploader';
import useAccount from '../../../../Tools/Hooks/useAccount';
import { capitalize } from '../../../../Tools/Utils/String';
import { getMediaType } from '../../../../Tools/Utils/File';
import { generateTempID } from '../../../../Tools/Utils/ID';
import useClass from '../../../../Tools/Hooks/useClass/index';
import { useState, useRef, useEffect, useMemo } from 'react';
import EditableInput from '../../../EditableInput/EditableInput';
import { IconNames } from '../../../../Assets/fontawesome/fa.names';
import { classNames, notify, copyToClipboard } from '../../../../Tools/Utils/React';
import getCroppedImg, { getVideoThumbnail, getFileName } from '../../../../Tools/Utils/Image';

export type MediaType = 'image' | 'video';

const MediaPicker: FC<MediaPickerPropTypes> = props => {
	const TEMP_ID = useMemo(() => generateTempID(), []);

	const { onLoad, onClose, onSaved, onRemove, onImageCropped, onInit } = props;
	const { tableName: CLASS_NAME = 'GENERAL_GALLERY', hardRemove = true } = props;
	const { editable: editableOnStartup, open, setOpen, item: galleryProp } = props;
	const { tag, relatedClassID = TEMP_ID, ID: CLASS_ID, mediaTypes = ['image', 'video'] } = props;

	const { Class, classLoadings } = useClass<any>(CLASS_NAME ?? 'ok');
	const PRIMARY_KEY = `${CLASS_NAME}_ID`;

	const { user } = useAccount();
	const [loading, setLoading] = useState(false);
	const [videoUrl, setVideoUrl] = useState<any>();
	const [isModalOpen, setModalOpen] = useState(!!open);
	const { register, Inputs, resetInputs } = useInputs();
	const [mediaType, setMediaType] = useState<MediaType>('image');
	const [editable, setEditable] = useState<boolean>(!!editableOnStartup);
	const [gItem, setGallery] = useState<any>({ [PRIMARY_KEY]: CLASS_ID });
	const accept = { image: mediaTypes?.includes('image'), video: mediaTypes?.includes('video') };

	//? ----------------- Actions -----------------------------------------------------

	const actions: GalleryActionsType = {
		clear: () => clear(),
		cancel: () => cancel(),
		save: async () => await submitMedia(),
		remove: async () => await removeMedia(),
	};

	//? ----------------- useEffects -----------------------------------------------------

	useEffect(() => {
		onInit?.(actions);
	}, []);

	useEffect(() => {
		if (!isModalOpen) return;
		clear();
		initLoad();
		return () => {
			setTimeout(clear, 300);
		};
	}, [isModalOpen, galleryProp, CLASS_ID]);

	useEffect(() => {
		setModalOpen(!!open);
	}, [open]);

	useEffect(() => {
		clear();
	}, [CLASS_ID]);

	useEffect(() => {
		const { putItem, getItem } = classLoadings;
		onLoad?.(loading || putItem || getItem);
	}, [loading, classLoadings]);

	//? ----------------- Server Connections ---------------------------------------------

	const removeMedia = async () => {
		try {
			if (hardRemove) {
				await Class.deleteItem(gItem?.[PRIMARY_KEY]);
				notify(`${Inputs?.name?.value} successfully removed`, {
					icon: 'l-check',
					type: 'success',
					duration: 2000,
				});
			}
			onRemove?.(gItem);
			clear();
		} catch {}
	};

	const submitMedia = async () => {
		try {
			const { item, action } = await Class.putItem({
				tag,
				name: Inputs?.name?.value,
				media: mediaFileRef.current,
				related_class_id: relatedClassID,
				thumbnail: thumbnailFileRef.current,
				SYSTEM_USER: user?.SYSTEM_USER_ID,
				[PRIMARY_KEY]: gItem?.[PRIMARY_KEY] || CLASS_ID,
			});
			setGallery(item);
			setEditable(false);
			onSaved?.(item);
			const msg = `${Inputs?.name?.value} successfully ${action === 'add' ? 'saved' : 'updated'}`;
			notify(msg, { icon: 'l-check', type: 'success', duration: 2000 });
		} catch (e) {
			console.error(e);
			notify(`saving ${Inputs?.name?.value} failed`, { icon: 'l-xmark', type: 'error' });
		}
	};

	const getMedia = async (ID?: string) => {
		if (!ID) return;
		const { item } = await Class.getItem(ID);
		return item;
	};

	//? ------------------ Utility Functions -----------------------------------------------------

	const initLoad = async () => {
		if (!CLASS_ID && !galleryProp) return setEditable(true);

		const data = galleryProp ?? (await getMedia(CLASS_ID));
		if (!data) return;
		setLoading(true);

		const { media, thumbnail, type }: any = data;
		setEditable(!!editableOnStartup);
		setMediaType(type);

		if (type === 'video') setVideoUrl(media);
		else if (type === 'image') {
			setImgUrl(media);
			setCroppedImageUrl(thumbnail);
		}

		setGallery(data);
		setLoading(false);
	};

	const clear = () => {
		setFiles([]);
		setImgUrl('');
		setVideoUrl('');
		setEditable(true);
		setCropMode('square');
		setGallery(undefined);
		setCroppedImageUrl('');
		imgFileRef.current = undefined;
		mediaFileRef.current = undefined;
		thumbnailFileRef.current = undefined;
	};

	const cancel = () => {
		gItem?.[PRIMARY_KEY] ? setEditable(false) : clear();
		resetInputs();
	};

	const toggleCropMode = () => editable && setCropMode(cm => (cm === 'circular' ? 'square' : 'circular'));

	const imgFileRef = useRef<any>();
	const mediaFileRef = useRef<any>();
	const thumbnailFileRef = useRef<any>();
	const [crop, setCrop] = useState<any>();
	const [files, setFiles] = useState<any[]>();
	const [imgUrl, setImgUrl] = useState<any>('');
	const [croppedImageUrl, setCroppedImageUrl] = useState<any>('');
	const [cropMode, setCropMode] = useState<'circular' | 'square'>('square');

	const onImageLoaded = (img: HTMLImageElement) => {
		imgFileRef.current = img;
	};

	const onFileSelect = async (files?: FileType[]) => {
		if (!(files && files.length > 0)) return clear();
		const file = files?.slice(-1)[0];
		const fileMediaType = getMediaType(file?.name);
		setMediaType(fileMediaType as any);

		const reader = new FileReader();
		const blobFile = file?.blobFile;
		if (!blobFile) return;
		reader.addEventListener('load', () => setImgUrl(reader.result));
		reader.readAsDataURL(blobFile as Blob);
		mediaFileRef.current = blobFile;

		if (fileMediaType === 'image') {
			setCrop({ unit: '%', width: 30, aspect: 1 });
			setTimeout(centerCropper, 100);
		} else if (fileMediaType === 'video') {
			setVideoUrl(URL.createObjectURL(blobFile));
		}
	};

	const onCropComplete = async (crop: any) => {
		if (!editable || !imgFileRef.current || !crop?.width || !crop?.height) return;
		const { fileUrl, blob }: any = await getCroppedImg(imgFileRef.current, crop, 'cropped.jpg');
		if (!fileUrl || !blob) return;
		onImageCropped?.(crop);
		setCroppedImageUrl(fileUrl);
		thumbnailFileRef.current = blob;
	};

	const copyFileUrlToClipboard = async (url: string, name: string) => {
		if (editable) return;
		try {
			await copyToClipboard(url);
			notify(`${name} URL copied to clipboard`, {
				icon: 'l-clipboard-check',
				type: 'success',
				placement: 'bottomCenter',
				duration: 1500,
			});
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		if (!editable) return;
		setCrop({ aspect: 1 });
	}, [editable]);

	const centerCropper = () => {
		if (!editable) return;
		const x = imgFileRef?.current?.width;
		const y = imgFileRef?.current?.height;
		const crop = {
			aspect: 1,
			unit: 'px',
			width: x / 2,
			height: x / 2,
			x: x / 2 - x / 4,
			y: y / 2 - x / 4,
		};
		setCrop(crop);
		onCropComplete(crop);
	};

	const onVideoLoaded = async (data: any) =>
		setTimeout(async () => {
			const video = data?.target;
			if (!video) return;
			const result = await getVideoThumbnail(video);
			if (!result?.file) return;
			thumbnailFileRef.current = result.file;
		}, 1500);

	//? ----------------------------Remove Confirm Modal-----------------------------------
	const [confirmModal, setConfirmModal] = useState({ isOpen: false });
	const closeConfirmModal = () => setConfirmModal(s => ({ ...s, isOpen: false }));
	const confirmationModal = (
		<Modal size='xs' onClose={closeConfirmModal} open={confirmModal.isOpen} className='media-picker-confirm-modal-layout'>
			<Modal.Body className='leading-7'>
				<p>
					Are you sure you want to <u className='text-red-400'>Remove</u> this {capitalize(mediaType)}?
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Btn onClick={closeConfirmModal}>Cancel</Btn>
				<Btn
					className='bg-red-600 font-bold  hover:bg-red-700'
					onClick={async () => {
						removeMedia();
						closeConfirmModal();
					}}
					appearance='primary'>
					Remove
				</Btn>
			</Modal.Footer>
		</Modal>
	);

	//? ------------------------------------------------------------------------------------

	const isSelected = !!imgUrl || !!videoUrl;
	const selectedFileName = isSelected ? files?.[0]?.name : 'Select Image';
	let thumbnailComponent = (
		<img
			alt='Crop'
			loading='lazy'
			onClick={() => {
				toggleCropMode();
				copyFileUrlToClipboard(gItem?.thumbnail, 'Thumbnail');
			}}
			src={!editable ? gItem?.thumbnail : croppedImageUrl}
			className={classNames('cropped-image rounded-md cursor-pointer', {
				'rounded-full': cropMode === 'circular',
			})}
		/>
	);

	if (!croppedImageUrl || (!editable && !gItem?.thumbnail))
		thumbnailComponent = (
			<div>
				<FaIcon fa='t-image' className='w-1/2 m-auto opacity-20' />
			</div>
		);

	let modalContent = (
		<div className='image-cropper-layout'>
			<Row gutter={14}>
				<Col xs={24} md={18} className='h-full'>
					<div>
						<div
							onClick={() => copyFileUrlToClipboard(gItem?.media, 'Image')}
							className={classNames('flex-center mr-1  bg-gray-50 rounded-xl overflow-hidden', {
								'cursor-pointer': !editable,
							})}>
							<ReactCrop
								src={imgUrl}
								imageAlt={gItem?.name}
								ruleOfThirds
								disabled={!editable}
								keepSelection={false}
								className='react-crop'
								crossorigin='anonymous'
								crop={editable && crop}
								onComplete={onCropComplete}
								onImageLoaded={onImageLoaded}
								circularCrop={cropMode === 'circular'}
								onChange={(crop: any) => setCrop(crop)}
							/>
						</div>
						<div className='font-semibold opacity-50 text-xs w-full flex-center'>{selectedFileName}</div>
					</div>
				</Col>
				<Col xs={24} md={6} className='flex flex-col flex-1'>
					<div className='h-full flex-col flex-center'>
						<div className='mb-2 font-semibold opacity-50 mt-6'>Thumbnail</div>
						{thumbnailComponent}
						<EditableInput
							label='Name'
							editable={editable}
							{...register('name', {
								defaultValue: getFileName(mediaFileRef.current) || gItem?.name || '',
							})}
						/>
					</div>
				</Col>
			</Row>
		</div>
	);

	if (mediaType === 'video')
		modalContent = (
			<div className='video-player-layout'>
				{!!videoUrl && (
					<video loop autoPlay controls poster={gItem?.thumbnail} onLoadedMetadata={onVideoLoaded}>
						<source src={videoUrl} />
					</video>
				)}

				<Row>
					<Col xs={24} md={12}>
						<EditableInput
							label='Name'
							editable={editable}
							{...register('name', {
								defaultValue: getFileName(mediaFileRef.current) || gItem?.name || '',
							})}
						/>
					</Col>
				</Row>
			</div>
		);

	let pickerIcon: IconNames = 't-image';
	if (accept.video) pickerIcon = 't-video';
	if (accept.video && accept.image) pickerIcon = 't-photo-film';
	if (!isSelected)
		modalContent = (
			<div className='w-full flex-center flex-col'>
				<Uploader
					draggable
					fileList={files}
					autoUpload={false}
					fileListVisible={false}
					accept={mediaTypes?.map(mt => `${mt}/*`).join(',')}
					onChange={files => {
						onFileSelect(files as any);
						setFiles(files?.slice(-1));
					}}>
					<div>
						<FaIcon fa={pickerIcon} className='mx-auto w-1/3 border py-3 px-5 opacity-10' />
						<div className='font-semibold mb-2.5 opacity-70'>
							Choose {accept.video && accept.image ? 'an image or a video' : accept.video ? 'a video' : 'an image'}
						</div>
					</div>
				</Uploader>
			</div>
		);

	return (
		<Modal
			size={isSelected ? 'md' : 'xs'}
			role='dialog'
			open={isModalOpen}
			onClose={() => {
				onClose?.();
				setOpen?.(false);
			}}
			className='media-picker-modal-layout'>
			<Modal.Header>
				<div className='flex items-center'>
					<span className='font-semibold text-lg'>
						{capitalize(
							isSelected ? mediaType : accept.video && accept.image ? 'media' : accept.video ? 'video' : 'image'
						)}{' '}
						File
					</span>
					<If condition={!!tag}>
						<div className='media-picker-tag'>{tag}</div>
					</If>
					{/* {gallery?.updatedAt && (
						<div className='last-update-tag'>
							Last Update: {moment(gallery?.updatedAt).format('MM.DD.YYYY hh:mm A')}
							{userName && (
								<span>
									{' - '} By {userName}
								</span>
							)}
						</div>
					)} */}
				</div>
			</Modal.Header>
			<PanelLoader loading={classLoadings.getItem || loading}>
				<div className='rs-modal-body '>{modalContent}</div>
				{isSelected && (
					<Modal.Footer>
						<div className='flex items-center mr-auto'>
							{(props.showRemoveButton ?? true) && editable && gItem?.media && (
								<Btn
									fa='l-trash'
									onClick={() => setConfirmModal({ isOpen: true })}
									loading={classLoadings.deleteItem}
									className='image-cropper-remove-btn'>
									Remove File
								</Btn>
							)}
						</div>
						<If condition={(props.showCancelButton ?? true) && editable}>
							<Btn fa='l-xmark' onClick={cancel} className='image-cropper-cancel-btn'>
								Cancel
							</Btn>
						</If>
						<If condition={(props.showSaveButton ?? true) && editable}>
							<Btn
								fa='l-floppy-disk'
								onClick={submitMedia}
								loading={classLoadings.putItem}
								className='image-cropper-save-btn'>
								Save File
							</Btn>
						</If>
						<If condition={(props.showEditButton ?? true) && !editable}>
							<Btn
								fa='l-pen'
								loading={classLoadings.putItem}
								onClick={() => setEditable(true)}
								className='image-cropper-edit-btn'>
								Edit {capitalize(mediaType)}
							</Btn>
						</If>
					</Modal.Footer>
				)}
			</PanelLoader>
			{confirmationModal}
		</Modal>
	);
};

export type GalleryItemType = {
	ID: string;
	name?: string;
	media: string;
	userID?: string;
	thumbnail?: string;
	updatedAt?: string;
	type?: 'image' | 'video';
};

export type GalleryActionsType = {
	clear?: () => any;
	cancel?: () => any;
	save?: () => Promise<any>;
	remove?: () => Promise<any>;
};

type MediaPickerPropTypes = {
	ID?: string;
	tag?: string;
	open?: boolean;
	editable?: boolean;
	tableName?: SUG<CLASS_NAMES>;
	hardRemove?: boolean;
	item?: GalleryItemType;
	relatedClassID?: string;
	mediaTypes?: ('image' | 'video')[];

	showSaveButton?: boolean;
	showEditButton?: boolean;
	showCancelButton?: boolean;
	showRemoveButton?: boolean;

	onClose?: () => any;
	setOpen?: (open: boolean) => any;
	onImageCropped?: (crop?: any) => any;
	onLoad?: (isLoading?: boolean) => any;
	onSaved?: (item?: GalleryItemType) => any;
	onRemove?: (item?: GalleryItemType) => any;
	onInit?: (actions: GalleryActionsType) => any;
};

export default MediaPicker;
