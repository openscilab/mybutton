import RouteRenderer, { Path } from '@src/App/Routes/RouteRenderer';
import Home from './Home/index';
import GetButton from './GetButton';

const PagesRouter = () => <RouteRenderer {...{ routes }} />;

export const routes: Path[] = [
	{ exact: true, path: ['/get'], component: () => <GetButton /> },
	{
		exact: false,
		path: ['*'],
		component: () => <Home />,
	},
];

export default PagesRouter;
