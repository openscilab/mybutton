import './index.scss';
import FaIcon from '@src/Components/FaIcon';

const Footer = () => {
	return (
		<div className='footer-layout'>
			<a href='https://openscilab.com' className='empowered'>
				empowered by OSL team
			</a>
			<div className='social-links'>
				<a href='https://discord.gg/JpvX3DQx' target='_blank' rel='noreferrer'>
					<FaIcon fa='b-discord' />
				</a>
				<a href='https://github.com/openscilab/mybutton' target='_blank' rel='noreferrer'>
					<FaIcon fa='b-github' />
				</a>
			</div>
		</div>
	);
};

export default Footer;
