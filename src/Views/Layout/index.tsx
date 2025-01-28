import './index.scss';
import Footer from './Footer';
import { useEffect } from 'react';
import NavBar from './Navbar/NavBar';
import ShareModal from './ShareModal';
import PagesRouter from '../Pages/PagesRouter';
import useStore from '@src/Tools/Store/useStore';
import { useSearchParams } from 'react-router-dom';
import { decode } from '@src/Tools/Utils/URLEncoding';
import { ReactComponent as Bg } from '@assets/Images/bg.svg';
import { setActivePage, setShareModal } from '@src/Tools/Store/slices/LocalCacheSlice';

const Layout = () => {
	const urlParams = useSearchParams()[0];
	const encoded = urlParams.get('encoded');
	const paramsString = encoded ? new URLSearchParams(decode(encoded || '')) : urlParams;
	const path = paramsString.get('path');
	const { dispatch } = useStore();

	useEffect(() => {
		if (path === 'custom_share') {
			dispatch(setShareModal({ open: true, url: paramsString.get('link'), subject: paramsString.get('subject') }));
		} else dispatch(setActivePage(path));
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
