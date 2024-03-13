import './index.scss';
import FaIcon from '../../FaIcon';
import { GalleryItemType } from '../Utils/MediaPicker';

const GalleryItem: FC<GalleryItemPropType> = props => {
	const { item, onClick, isNew, className, style } = props;
	const name = item?.name;
	const src = item?.thumbnail;

	let img = <FaIcon fa={item?.type === 'video' ? 't-video' : 't-image'} />;

	if (!!src) img = <img src={src} alt={name} />;

	if (isNew) img = <FaIcon fa='t-plus' />;

	return (
		<div style={style} className={`gallery-item-layout ${!!className ? className : ''}`} onClick={onClick}>
			<div className='gallery-item-img'>{img}</div>
			{item?.type === 'video' && <FaIcon fa='s-play' />}
			<div className='gallery-item-overlay'>{name}</div>
		</div>
	);
};

type GalleryItemPropType = {
	style?: any;
	src?: string;
	name?: string;
	onClick?: any;
	isNew?: boolean;
	className?: string;
	item?: GalleryItemType;
};

export default GalleryItem;
