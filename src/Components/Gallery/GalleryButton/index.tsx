import './index.scss';
import Btn from '../../BTN/BTN';
import { useState } from 'react';
import Gallery, { GalleryCallbacksType, GalleryConfigType } from '..';

type GalleryButtonType = GalleryCallbacksType & GalleryConfigType;

const GalleryButton: FC<GalleryButtonType> = props => {
	const { children } = props;
	const [open, setOpen] = useState(false);
	const openGallery = () => setOpen(true);
	const galleryElement = <Gallery open={open} setOpen={setOpen} {...props} />;

	let Element = <Btn children='Open Gallery' fa='l-photo-film' onClick={openGallery} />;
	if (children) Element = <div onClick={openGallery}>{children}</div>;

	return (
		<>
			{Element}
			{galleryElement}
		</>
	);
};

export default GalleryButton;
