import './NavBar.scss';
import { useState } from 'react';
import { Navbar, Nav } from 'rsuite';
import { classes } from '@tools/Utils/React';
import useStore from '@src/Tools/Store/useStore';
import { useNavigate } from 'react-router-dom';
import { setOpenShareModal } from '@src/Tools/Store/actions/LocalCacheActions';

const NavBar = () => {
	const navigate = useNavigate();
	const { dispatch } = useStore();
	const [activeKey, setActiveKey] = useState('home');

	// ? -------------------------------- UseEffects 👇 ------------------------------------------------------ //

	// ? -------------------------------- Functions 👇 ------------------------------------------------------ //

	return (
		<div {...classes('navbar-layout')}>
			<Navbar className='navbar'>
				<Navbar.Brand className='nav-brand' onClick={() => navigate('/')}>
					MyButton
				</Navbar.Brand>

				<Nav className='main-nav' activeKey={activeKey} onSelect={setActiveKey} pullRight>
					<div className='nav-item' onClick={() => dispatch(setOpenShareModal(true))}>
						Share
					</div>
					<div className='nav-item' onClick={() => navigate('/get')}>
						Get
					</div>
				</Nav>
			</Navbar>
		</div>
	);
};

export default NavBar;
