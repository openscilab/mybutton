import './index.scss';
import { ReactComponent as Github } from '@assets/icons/github.svg';
import { ReactComponent as Discord } from '@assets/icons/discord.svg';
import { CONFIG } from '@src/App/Config/constants';

const Footer = () => {
	return (
		<div className='footer-layout'>
			<div className='about-mybutton'>
				<a href='https://openscilab.com' target='_blank' rel='noreferrer' className='empowered'>
					Empowered by OSL team
				</a>
				<div className='social-links'>
					<a href='https://discord.gg/T2VzhzqU67' target='_blank' rel='noreferrer'>
						<Discord className='social-icon' />
					</a>
					<a href='https://github.com/openscilab/mybutton' target='_blank' rel='noreferrer'>
						<Github className='social-icon' />
					</a>
				</div>
			</div>
			<div className='version'>Version {CONFIG.VERSION}</div>
		</div>
	);
};

export default Footer;
