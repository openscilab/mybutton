import './index.scss';
import NavBar from './Navbar/NavBar';
import ShareModal from './ShareModal';
import PagesRouter from '../Pages/router';
import { ReactComponent as Bg } from '@assets/Images/bg.svg';
import Footer from './Footer';

const Layout = () => {
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
