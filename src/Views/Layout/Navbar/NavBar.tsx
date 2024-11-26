import './NavBar.scss';
import { Navbar, Nav } from 'rsuite';
import useStore from '@src/Tools/Store/useStore';
import { classes } from '@src/Tools/Utils/React';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as Logo } from '@assets/Images/logo-text.svg';
import { setOpenShareModal, useLocalCache } from '@src/Tools/Store/slices/LocalCacheSlice';

const NavBar = () => {
	const { activePage } = useLocalCache();
	const { dispatch } = useStore();
	const setSearchParams = useSearchParams()[1];

	return (
		<div className='navbar-layout'>
			<Navbar className='navbar'>
				<Navbar.Brand
					className='nav-brand'
					onClick={() =>
						setSearchParams(params => {
							params.forEach((val, key) => {
								params.delete(key);
							});
							return params;
						})
					}>
					<Logo className='logo-text' />
				</Navbar.Brand>

				<Nav className='main-nav' pullRight>
					<div className='nav-item' onClick={() => dispatch(setOpenShareModal(true))}>
						Share
					</div>
					<div
						{...classes('nav-item', { active: activePage === 'get' })}
						onClick={() => setSearchParams({ path: 'get' })}>
						Get
					</div>
				</Nav>
			</Navbar>
		</div>
	);
};

export default NavBar;
