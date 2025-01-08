import './index.scss';
import Footer from './Footer';
import { useEffect } from 'react';
import NavBar from './Navbar/NavBar';
import ShareModal from './ShareModal';
import PagesRouter from '../Pages/PagesRouter';
import useStore from '@src/Tools/Store/useStore';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as Bg } from '@assets/Images/bg.svg';
import { setActivePage, setOpenShareModal } from '@src/Tools/Store/slices/LocalCacheSlice';
import { decode } from '@src/Tools/Utils/URLEncoding';

const Layout = () => {
	const urlParams = useSearchParams()[0];
	const encoded = urlParams.get('encoded');
	const path = urlParams.get('path') || new URLSearchParams(decode(encoded || '')).get('path');
	const { dispatch } = useStore();

	useEffect(() => {
		dispatch(setActivePage(path));
		if (path === 'custom_share') {
			dispatch(setOpenShareModal(true));
		}
	}, [path]);

	return (
		<div className='root-layout'>
			<ShareModal />
			<NavBar />
			<Bg className='background-img' />
			<PagesRouter path={path} />
			<Footer />
		</div>
	);
};

export default Layout;
