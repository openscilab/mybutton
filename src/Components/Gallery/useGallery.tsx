import { useState, useEffect } from 'react';
import useClass from '../../Tools/Hooks/useClass';
import { GalleryActionsType } from './Utils/MediaPicker';
import { GalleryItemType, MediaType } from './Utils/MediaPicker';

const initOptions: GalleryOptionsType = { fetchItemsOnStartup: true };

const useGallery = (galleyOptions: GalleryOptionsType = {}) => {
	const options = { ...initOptions, ...galleyOptions };
	const { params } = options;
	const { tableName: CLASS_NAME = 'GENERAL_GALLERY' } = params || {};

	const [isGalleryOpen, setGalleryOpen] = useState(false);
	const [items, setItems] = useState<GalleryItemType[]>([]);
	const { Class, classLoadings } = useClass<any>(CLASS_NAME);
	const [isMediaPickerOpen, setMediaPickerOpen] = useState(false);
	const [mediaPickerActions, setMediaPickerActions] = useState<GalleryActionsType>();

	useEffect(() => {
		if (options?.fetchItemsOnStartup) fetchItems();
	}, []);

	const fetchItems = async (itemsParams?: GalleryParams) => {
		setItems([]);
		const { items } = await Class.getItems({ params: { ...params, ...itemsParams } });
		setItems(items as any);
		return items as GalleryItemType[];
	};

	const removeGalleryItem = async (id: string) => await Class.deleteItem(id);

	const registerMediaPicker = {
		...params,
		open: isMediaPickerOpen,
		setOpen: setMediaPickerOpen,
		onInit: (actions: any) => setMediaPickerActions(actions),
	};

	const registerGallery = {
		...params,
		open: isGalleryOpen,
		setOpen: setGalleryOpen,
	};

	return {
		items,
		fetchItems,
		galleryLoading: classLoadings.getItems,

		registerGallery,
		setGalleryOpen,
		isGalleryOpen,

		mediaPickerActions,
		registerMediaPicker,
		setMediaPickerOpen,
		isMediaPickerOpen,

		removeGalleryItem,
	};
};

export type GalleryOptionsType = {
	params?: GalleryParams;
	fetchItemsOnStartup?: boolean;
};

export type GalleryParams = {
	ID?: string;
	tag?: string;
	mediaTypes?: MediaType[];
	related_class_id?: string;
	tableName?: SUG<CLASS_NAMES>;
};

export default useGallery;
