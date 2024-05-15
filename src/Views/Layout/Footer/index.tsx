import './index.scss';
import { ReactComponent as Github } from '@assets/icons/github.svg';
import { ReactComponent as Discord } from '@assets/icons/discord.svg';

const Footer = () => {
	return (
		<div className='footer-layout'>
			<a href='https://openscilab.com' target='_blank' rel='noreferrer' className='empowered'>
				Empowered by OSL team
			</a>
			<div className='social-links'>
				<a href='https://discord.gg/JpvX3DQx' target='_blank' rel='noreferrer'>
					<Discord className='social-icon' />
				</a>
				<a href='https://github.com/openscilab/mybutton' target='_blank' rel='noreferrer'>
					<Github className='social-icon' />
				</a>
			</div>
		</div>
	);
};

export default Footer;
