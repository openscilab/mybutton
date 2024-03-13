import './index.scss';
import { Modal } from 'rsuite';
import FaIcon from '../FaIcon';
import FaButton from '../FaButton';
import { If } from 'tsx-statements';
import GalleryItem from './GalleryItem';
import PanelLoader from '../PanelLoader';
import useClass from '../../Tools/Hooks/useClass';
import { generateTempID } from '../../Tools/Utils/ID';
import { useEffect, useState, useMemo } from 'react';
import { TypeAttributes } from 'rsuite/esm/@types/common';
import { copyToClipboard, notify } from '../../Tools/Utils/React';
import MediaPicker, { GalleryItemType } from './Utils/MediaPicker';
import { generateRandomString, capitalize } from '../../Tools/Utils/String';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

const Gallery: FC<GalleryPropType> = props => {
	let { ID, relatedClassID, tag, mediaTypes, size = 'md' } = props;
	const { tableName = 'GENERAL_GALLERY', onChange, onAddItem, onRemoveItem } = props;
	const { open: isModalOpen, setOpen: setModalOpen, limit, hardRemove = true } = props;

	const TEMP_ID = useMemo(() => generateTempID(), []);
	if (relatedClassID === '*') relatedClassID = undefined;
	else if (relatedClassID === undefined) relatedClassID = TEMP_ID;

	const { Class, classLoadings, PRIMARY_KEY } = useClass<any>(tableName);

	const [tempDeletedIds, setTempDeletedIds] = useState<string[]>([]);

	const id = generateRandomString(5);
	const [activeItem, setActiveItem] = useState<any>({});
	const [items, setItems] = useState<GalleryItemType[]>([]);
	const [openItemModal, setOpenItemModal] = useState(false);
	const [galleryMediaType, setGalleryMediaType] = useState(mediaTypes);
	const [activeCtxMenuItem, setActiveCtxMenuItem] = useState<GalleryItemType>();
	const [canAddMoreItem, setCanAddMoreItem] = useState<{
		total?: boolean;
		video?: boolean;
		image?: boolean;
	}>({ total: true, video: true, image: true });

	const accept = {
		image: galleryMediaType?.includes('image'),
		video: galleryMediaType?.includes('video'),
	};

	//? ----------------- useEffects -----------------------------------------------------

	useEffect(() => {
		if (!isModalOpen) return;
		initLoad();
	}, [isModalOpen, tag, ID, relatedClassID]);

	useEffect(() => {
		onChange?.(items);
		addPermissionHandler(items);
	}, [items]);

	//? ----------------- Server Connections ---------------------------------------------

	const initLoad = async () => {
		const params = { [PRIMARY_KEY]: ID, tag, mediaTypes, related_class_id: relatedClassID };
		let { items = [] } = await Class.getItems({ params });
		if (mediaTypes && items?.length) items = items?.filter(d => mediaTypes?.includes(d?.type));
		setItems(items);
	};

	//? ------------------- Utility functions ---------------------------------------------

	const onItemClickHandler = (item: GalleryItemType) => {
		setActiveItem(item);
		setOpenItemModal(true);
	};

	const addPermissionHandler = (items: GalleryItemType[]) => {
		let canAdd = true;
		let canAddVideo = true;
		let canAddImage = true;

		if (limit?.image !== undefined) canAddImage = items?.filter(i => i?.type === 'image')?.length < limit?.image;
		if (limit?.video !== undefined) canAddVideo = items?.filter(i => i?.type === 'video')?.length < limit?.video;

		if (limit?.total !== undefined) canAdd = items?.length < limit?.total;
		canAdd = canAdd && (canAddImage || canAddVideo);

		setCanAddMoreItem({ total: canAdd, video: canAddVideo, image: canAddImage });

		const availableMediaTypes: any = [...(canAddImage ? ['image'] : []), ...(canAddVideo ? ['video'] : [])];

		setGalleryMediaType(availableMediaTypes);
	};

	const onItemRemove = (item?: GalleryItemType) => {
		setItems(s => s?.filter((i: any) => i?.[PRIMARY_KEY] !== (item as any)?.[PRIMARY_KEY]));
		setTempDeletedIds(s => [...s, (item as any)?.[PRIMARY_KEY]]);
		setOpenItemModal(false);
		setActiveItem(undefined);
		onRemoveItem?.(item);
	};

	const onItemCreateOrUpdate = (item?: GalleryItemType) => {
		if (!item) return;
		const itemIndex = items?.findIndex((i: any) => i?.[PRIMARY_KEY] === (item as any)?.[PRIMARY_KEY]);
		setItems(s => {
			const newItems = [...(s ?? [])];
			if (itemIndex < 0) newItems.push(item);
			else newItems[itemIndex] = item;
			return newItems;
		});
		onAddItem?.(item);
		setActiveItem(undefined);
		setOpenItemModal(false);
	};

	const addNewItem = () => {
		setActiveItem(undefined);
		setOpenItemModal(true);
	};

	const onContextMenuItemClickHandler = async (action: 'copy-photo' | 'copy-thumbnail') => {
		const isPhoto = action === 'copy-photo';
		const name = isPhoto ? 'Photo' : 'Thumbnail';
		const url = isPhoto ? activeCtxMenuItem?.media : activeCtxMenuItem?.thumbnail;
		if (!url) return;

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

	//? ------------------------------------------------------------------------------------

	const itemsElement = items
		?.sort((a, b) => (!!b?.thumbnail ? 1 : 0) - (!!a?.thumbnail ? 1 : 0))
		?.sort((a, b) => (!!(b?.type === 'video') ? 1 : 0) - (!!(a?.type === 'video') ? 1 : 0))
		?.filter((i: any) => !tempDeletedIds.includes(i?.[PRIMARY_KEY]))
		.map((item, i) => (
			<ContextMenuTrigger key={i} collect={() => setActiveCtxMenuItem(item)} id={`gallery-context-menu-${id}`}>
				<GalleryItem
					item={item}
					key={item?.ID + item?.updatedAt}
					onClick={() => onItemClickHandler(item)}
					style={{ animationDuration: `${i * 50}ms` }}
				/>
			</ContextMenuTrigger>
		));

	return (
		<div className='gallery-layout'>
			<Modal
				size={items.length === 0 ? 'xs' : size}
				role='dialog'
				open={isModalOpen}
				onClose={() => setModalOpen?.(false)}
				className='gallery-modal-layout'>
				<Modal.Header>
					<div className='flex items-center'>
						<span className='font-black text-lg'>Gallery {!!items?.length ? `(${items?.length})` : ''}</span>
						{tag && <div className='gallery-tag float-left '>{tag}</div>}
					</div>
				</Modal.Header>
				<div className='rs-modal-body'>
					<PanelLoader loading={classLoadings.getItems}>
						<div className='gallery-items'>{itemsElement}</div>
						<If condition={!items?.length}>
							<div className='flex-center flex-col animate-fade-in'>
								<FaIcon fa='t-image-slash' className='w-24 opacity-10' />
								<div className='text-base font-bold mb-2 opacity-75'>Gallery is Empty!</div>
							</div>
						</If>
					</PanelLoader>
				</div>
				<Modal.Footer>
					<FaButton
						fa='l-plus'
						onClick={addNewItem}
						className='gallery-add-btn'
						disabled={!canAddMoreItem.total}
						title={!canAddMoreItem.total ? 'Gallery is full' : undefined}>
						Add {accept.video && accept.image ? 'Media' : accept.video ? 'Video' : 'Image'}
					</FaButton>
				</Modal.Footer>
			</Modal>
			<MediaPicker
				item={activeItem}
				open={openItemModal}
				onRemove={onItemRemove}
				setOpen={setOpenItemModal}
				tag={tag || activeItem?.tag}
				mediaTypes={galleryMediaType}
				onSaved={onItemCreateOrUpdate}
				{...{ relatedClassID, hardRemove, tableName }}
			/>
			<ContextMenu hideOnLeave className='gallery-context-menu' id={`gallery-context-menu-${id}`}>
				<div className='gallery-context-menu-title'>{activeCtxMenuItem?.name}</div>
				<If condition={!!activeCtxMenuItem?.media}>
					<MenuItem
						className='gallery-context-menu-item'
						onClick={onContextMenuItemClickHandler.bind(null, 'copy-photo')}>
						Copy {capitalize(activeCtxMenuItem?.type || '')} url
					</MenuItem>
				</If>
				<If condition={!!activeCtxMenuItem?.thumbnail}>
					<MenuItem
						className='gallery-context-menu-item'
						onClick={onContextMenuItemClickHandler.bind(null, 'copy-thumbnail')}>
						Copy Thumbnail url
					</MenuItem>
				</If>
			</ContextMenu>
		</div>
	);
};

export type GalleryConfigType = {
	ID?: string;
	tag?: string;
	hardRemove?: boolean;
	relatedClassID?: string;
	mediaTypes?: ('image' | 'video')[];
	limit?: { total?: number; image?: number; video?: number };
	tableName?: SUG<StartsWith<CLASS_NAMES, 'GALLERY'> | EndsWith<CLASS_NAMES, 'GALLERY'>>;
};

export type GalleryCallbacksType = {
	onAddItem?: (item?: GalleryItemType) => any;
	onChange?: (items?: GalleryItemType[]) => any;
	onRemoveItem?: (item?: GalleryItemType) => any;
};

export type GalleryPropType = GalleryConfigType &
	GalleryCallbacksType & {
		open?: boolean;
		size?: TypeAttributes.Size;
		setOpen?: (isOpen: boolean) => any;
	};

export default Gallery;
