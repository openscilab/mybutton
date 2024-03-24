import './index.scss';
import NavBar from './Navbar/NavBar';
import ShareModal from './ShareModal';
import PagesRouter from '../Pages/router';

const Layout = () => {
	return (
		<div className='root-layout'>
			<ShareModal />
			<NavBar />
			<PagesRouter />
		</div>
	);
};

export default Layout;
