import Home from './Home';
import Share from './Share';
import GetButton from './GetButton';

const PagesRouter = (props: { path: string | null }) => {
	if (props.path === 'get') return <GetButton />;

	if (props.path === 'share') return <Share />;

	return <Home />;
};

export default PagesRouter;
