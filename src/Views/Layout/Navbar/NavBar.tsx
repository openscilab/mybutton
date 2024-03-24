import './NavBar.scss';
import { useState } from 'react';
import { Navbar, Nav } from 'rsuite';
import { classes } from '@tools/Utils/React';
import useStore from '@src/Tools/Store/useStore';
import { setOpenShareModal } from '@src/Tools/Store/actions/DashboardActions';

const NavBar = () => {
	const { dispatch } = useStore();
	const [isMinimal, setMinimal] = useState(false);
	const [activeKey, setActiveKey] = useState('home');

	// ? -------------------------------- UseEffects 👇 ------------------------------------------------------ //

	// ? -------------------------------- Functions 👇 ------------------------------------------------------ //

	return (
		<div {...classes('navbar-layout', { 'navbar-layout-minimal': isMinimal })}>
			<Navbar className='navbar'>
				<Navbar.Brand className='nav-brand'>MyButton</Navbar.Brand>

				<Nav className='main-nav' activeKey={activeKey} onSelect={setActiveKey} pullRight>
					<Nav.Item className='nav-item' eventKey='home' onClick={() => dispatch(setOpenShareModal(true))}>
						Share
					</Nav.Item>
				</Nav>
			</Navbar>
		</div>
	);
};

export default NavBar;
