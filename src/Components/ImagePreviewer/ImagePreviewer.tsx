import './ImagePreviewer.scss';
import { Popover, Whisper } from 'rsuite';

const ImagePreviewer: FC<Props> = props => {
	const { src, className = '', popoverClassName = '' } = props;

	const openTab = () => src && window.open(src);

	const speaker = (
		<Popover onClick={openTab} className={`image-previewer-popover ${popoverClassName}`}>
			<img className='img-main' {...{ src }} alt='original' />
		</Popover>
	);

	return (
		<Whisper placement='auto' enterable speaker={speaker}>
			<div onClick={openTab} className={`image-previewer ${className}`}>
				<img className='img-small' {...{ src }} alt='previewer' />
			</div>
		</Whisper>
	);
};

type Props = {
	src: string;
	className?: string;
	popoverClassName?: string;
};

export default ImagePreviewer;
