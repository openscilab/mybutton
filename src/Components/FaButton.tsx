import FaIcon from './FaIcon';
import { Button, ButtonProps } from 'rsuite';
import { IconNames } from '../Assets/fontawesome/fa.names';
import { useNavigate } from 'react-router-dom';

type FaButtonProps = ButtonProps & { fa?: IconNames; goBack?: boolean };

const FaButton: FC<FaButtonProps> = ({ fa, goBack, children, className, ...rest }) => {
	const navigate = useNavigate();
	return (
		<Button className={`fa-btn ${fa}-btn  ${className}`} onClick={() => goBack && navigate(-1)} {...rest}>
			{fa && <FaIcon fa={fa} />}
			{children}
		</Button>
	);
};

export default FaButton;
