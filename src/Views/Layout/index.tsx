import './index.scss';
import NavBar from './Navbar/NavBar';
import ShareModal from './ShareModal';
import PagesRouter from '../Pages/router';
import { ReactComponent as Bg } from '@assets/Images/bg.svg';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Layout = () => {
	const navigate = useNavigate();
	const params_string = window.location.search;
	const urlParams = new URLSearchParams(params_string);
	const path = urlParams.get('path');

	useEffect(() => {
		if (path) {
			urlParams.delete('path');
			const new_params = urlParams.toString();
			navigate(`/${path}`);
			if (new_params) window.location.search = new_params;
		}
	}, []);

	if (path) {
		return <div className='root-layout' />;
	}

	return (
		<div className='root-layout'>
			<ShareModal />
			<NavBar />
			<Bg className='background-img' />
			<PagesRouter />
			<Footer />
		</div>
	);
};

export default Layout;
