import RouteRenderer, { Path } from '@src/App/Routes/RouteRenderer';
import { lazy } from 'react';

const PagesRouter = () => <RouteRenderer {...{ routes }} />;

export const routes: Path[] = [
	{
		path: ['/get'],
		exact: true,
		component: lazy(() => import('../Pages/GetButton')),
	},
	{
		exact: false,
		path: ['*'],
		component: lazy(() => import('../Pages/Home')),
	},
];

export default PagesRouter;
