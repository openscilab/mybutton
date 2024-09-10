import './index.scss';
import Footer from './Footer';
import { useEffect } from 'react';
import NavBar from './Navbar/NavBar';
import ShareModal from './ShareModal';
import PagesRouter from '../Pages/PagesRouter';
import useStore from '@src/Tools/Store/useStore';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as Bg } from '@assets/Images/bg.svg';
import { setActivePage } from '@src/Tools/Store/slices/LocalCacheSlice';

const Layout = () => {
	const urlParams = useSearchParams()[0];
	const path = urlParams.get('path');
	const { dispatch } = useStore();

	useEffect(() => {
		dispatch(setActivePage(path));
	}, [path]);

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
