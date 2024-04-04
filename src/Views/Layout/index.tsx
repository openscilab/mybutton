import './index.scss';
import NavBar from './Navbar/NavBar';
import ShareModal from './ShareModal';
import PagesRouter from '../Pages/router';
import { ReactComponent as Bg } from '@assets/Images/bg.svg';

const Layout = () => {
	return (
		<div className='root-layout'>
			<ShareModal />
			<NavBar />
			<Bg className='background-img' />
			<PagesRouter />
		</div>
	);
};

export default Layout;
