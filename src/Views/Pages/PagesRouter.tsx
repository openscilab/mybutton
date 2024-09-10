import Home from './Home';
import Share from './Share';
import GetButton from './GetButton';
import { useLocalCache } from '@src/Tools/Store/slices/LocalCacheSlice';

const PagesRouter = () => {
	const { activePage } = useLocalCache();

	if (activePage === 'get') return <GetButton />;

	if (activePage === 'share') return <Share />;

	return <Home />;
};

export default PagesRouter;
