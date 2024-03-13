import './index.scss';
import useGallery from '../useGallery';
import PanelLoader from '../../PanelLoader';
import { VideoHTMLAttributes, useState, useEffect } from 'react';

const GalleryVideoPlayer: FC<GalleryVideoPlayerProp> = props => {
	const { galleryItem: galleryItemProp, controls = true, ...rest } = props;
	const { fetchItems, galleryLoading } = useGallery({ fetchItemsOnStartup: false });
	const [gallery, setGallery] = useState<VideoGalleryItemType | undefined>(galleryItemProp);

	//?------------------- useEffects --------------------------------------------//

	useEffect(() => {
		initLoad();
	}, []);

	//?---------------------- utility functions --------------------------------

	const initLoad = async () => {
		if (gallery?.media || !galleryItemProp) return;
		const galleryItems = await fetchItems({ ID: galleryItemProp?.galleryId });
		setGallery(galleryItems?.[0]);
	};

	//?-------------------------------------------------------------------------

	return (
		<PanelLoader loading={galleryLoading}>
			<video {...rest} controls={controls} className='gallery-video-player' poster={rest?.poster || gallery?.thumbnail}>
				<source src={rest?.src || gallery?.media} />
			</video>
		</PanelLoader>
	);
};

type GalleryVideoPlayerProp = VideoHTMLAttributes<HTMLVideoElement> & {
	galleryItem?: VideoGalleryItemType;
};

type VideoGalleryItemType = {
	name?: string;
	media?: string;
	userId?: string;
	galleryId?: string;
	thumbnail?: string;
	updatedAt?: string;
	type?: 'image' | 'video';
};

export default GalleryVideoPlayer;
